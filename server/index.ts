import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { auth } from "../auth";
import workoutsRoute from "./routes/workouts";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

const app = new Hono();

const api = app
  .use("*", logger())
  .use(trimTrailingSlash())
  .basePath("/api")
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use(
    "/auth/*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .notFound((c) => c.json({ msg: "Not found" }, 404))
  .get("/", (c) => {
    return c.json({ msg: "Howdy 🤠!" }, 200);
  })
  .route("/workouts", workoutsRoute);

app.use("*", serveStatic({ root: "./view/dist" }));
app.get("*", serveStatic({ path: "./view/dist/index.html" }));

export type AppType = typeof api;
export default app;
