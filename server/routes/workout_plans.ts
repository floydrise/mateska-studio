import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { IdParamSchema, PatchWorkoutPlanSchema } from "../schemas/zod_schemas";
import { db } from "../db";
import { workoutPlanTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { validateId } from "../utils";

const app = new Hono()
  .get("/", async (c) => {
    const plans = await db.select().from(workoutPlanTable);
    return c.json({ plans });
  })
  .get("/:id", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const plan = await db
      .select()
      .from(workoutPlanTable)
      .where(eq(workoutPlanTable.workoutPlanId, id))
      .then((res) => res[0]);
    if (!plan) return c.json({ msg: "No plan found" }, 404);
    return c.json({ plan });
  })
  .patch(
    "/:id",
    validateId,
    zValidator("json", PatchWorkoutPlanSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const validatedPlan = c.req.valid("json");
      const updatedWorkoutPlan = await db
        .update(workoutPlanTable)
        .set({ workoutPlanTitle: validatedPlan.workoutPlanTitle })
        .where(eq(workoutPlanTable.workoutPlanId, id))
        .returning()
        .then((res) => res[0]);
      if (!updatedWorkoutPlan)
        return c.json({ msg: "Couldn't find a plan to update" }, 404);
      return c.json(
        { msg: "Successfully updated workout plan", updatedWorkoutPlan },
        200,
      );
    },
  )
  .delete("/:id", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const deletedPlan = await db
      .delete(workoutPlanTable)
      .where(eq(workoutPlanTable.workoutPlanId, id))
      .returning()
      .then((res) => res[0]);
    if (!deletedPlan) return c.json({ msg: "No plan found to delete" }, 404);
    return c.json(
      { msg: "Successfully deleted the workout plan", deletedPlan },
      200,
    );
  });

export default app;
