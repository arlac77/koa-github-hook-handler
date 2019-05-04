import { createHmac } from "crypto";
import rawBody from "raw-body";

/**
 * @typedef {Function} Handler
 * @param {Context} ctx
 * @param {Function} next
 */

/**
 * Create a koa middleware suitable to bridge webhook requests to Handlers
 * @param {Object} actions holding all the handles for the events (event is the key)
 * @param {Object} config
 * @param {string} config.secret to decode signature
 * @return {Function} suitable as koa middleware
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

    const handler = actions[event];

    if (handler !== undefined) {
      const data = JSON.parse(body.toString());
      ctx.body = handler(data);
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
