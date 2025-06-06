import { Hono } from "hono";

const app = new Hono()
.get("/", (c) => c.json({msg: "Working"}))
  .post("/", (c) => {})

export default app