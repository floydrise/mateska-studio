import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";

const app = new Hono().basePath("/api").use(trimTrailingSlash());

app.get("/", (c) => {
  return c.json({ msg: "Howdy 🤠" });
});

export default app;
