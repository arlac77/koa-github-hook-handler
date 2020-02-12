import { createServer } from "http";
import Koa from "koa";
import Router from "koa-better-router";

export const secret = "aSecret";
export const path = "webhook";

export function createHookServer(
  handler,
  port,
  hookHandler
) {
  const app = new Koa();
  const server = createServer(app.callback());
  const router = Router();

  router.addRoute("POST", path, hookHandler(handler, { secret }));

  app.use(router.middleware());
  app.listen(port);

  return server;
}