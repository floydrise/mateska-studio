import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import workoutsRoute from "./routes/workouts";

const app = new Hono().basePath("/api").use(trimTrailingSlash());

const route = app
  .get("/", (c) => {
    return c.json({ msg: "Howdy 🤠" });
  })
  .route("/workouts", workoutsRoute);

export type AppType = typeof route;
export default app;
