import { createHmac } from "crypto";
import rawBody from "raw-body";

/**
 * @typedef {Function} KoaHandler
 * @param {Context} ctx
 * @param {Function} next
 */

/**
 * @typedef {Function} WebhookHandler
 * @param {Object} request decoded request body
 * @param {string} event from 'x-github-event' header
 * @param {Context} ctx from koa
 */

/**
 * Create a koa middleware suitable to bridge webhook requests to KoaHandlers
 * @param {Object} actions holding all the handles for the events (event is the key)
 * @param {WebhookHandler} actions.event  (event is the key)
 * @param {Object} config
 * @param {string} config.secret to decode signature
 * @return {KoaHandler} suitable as koa middleware
 */
export function createGithubHookHandler(actions, config = {}) {
  return async (ctx, next) => {
    const [sig, event, id] = headers(ctx, [
      "x-hub-signature",
      "x-github-event",
      "x-github-delivery"
    ]);

    const body = await rawBody(ctx.req);

    if (!verify(sig, body, config.secret)) {
      ctx.throw(401, "x-hub-signature does not match blob signature");
    }

    const handler = actions[event] || actions.default;

    if (handler !== undefined) {
      const data = JSON.parse(body.toString());
      ctx.body = handler(data, event, ctx);
    } else {
      ctx.throw(`unknown event type ${event}`);
    }
    return next();
  };
}

function headers(ctx, names) {
  return names.map(name => {
    const v = ctx.get(name);
    if (v === undefined) {
      ctx.throw(400, `${name} required`);
    }
    return v;
  });
}

function sign(data, secret) {
  return (
    "sha1=" +
    createHmac("sha1", secret)
      .update(data)
      .digest("hex")
  );
}

function verify(signature, data, secret) {
  return Buffer.from(signature).equals(Buffer.from(sign(data, secret)));
}
