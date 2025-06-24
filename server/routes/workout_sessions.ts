import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { workoutSessionsTable } from "../db/schema/schema";
import { eq } from "drizzle-orm";
import { PatchSessionSchema } from "../schemas/zod_schemas";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middleware/auth-middleware";

const app = new Hono()
  .delete(
    "/:sessionId",
    zValidator(
      "param",
      z.object({
        sessionId: z.coerce.number().positive(),
      })
    ),
    authMiddleware,
    async (c) => {
      const { sessionId } = c.req.valid("param");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const deletedSession = await db
        .delete(workoutSessionsTable)
        .where(eq(workoutSessionsTable.workoutSessionId, sessionId))
        .returning()
        .then((res) => res[0]);
      if (!deletedSession)
        return c.json({ msg: "No session found to be deleted" }, 404);
      return c.json(
        { msg: "Successfully deleted session", deletedSession },
        200
      );
    }
  )
  .patch(
    "/:sessionId",
    zValidator(
      "param",
      z.object({
        sessionId: z.coerce.number().positive(),
      })
    ),
    authMiddleware,
    zValidator("json", PatchSessionSchema),
    async (c) => {
      const { sessionId } = c.req.valid("param");
      const validatedSession = c.req.valid("json");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const updatedSession = await db
        .update(workoutSessionsTable)
        .set(validatedSession)
        .where(eq(workoutSessionsTable.workoutSessionId, sessionId))
        .returning()
        .then((res) => res[0]);
      if (!updatedSession) return c.json({ msg: "No session updated" }, 404);
      return c.json({ msg: "Successfully updated session", updatedSession });
    }
  );

export default app;
