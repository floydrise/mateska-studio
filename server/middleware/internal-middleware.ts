import { createMiddleware } from "hono/factory";

const internalApiKey = process.env.INTERNAL_API_KEY!;

export const internalMiddleware = createMiddleware(async (c, next) => {
  const apiKey = c.req.header("x-internal-api-key");
  if (apiKey !== internalApiKey) {
    return c.json({ msg: "Unauthorised" }, 401);
  }
  return next();
});
