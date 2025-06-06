import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { WorkoutSchema } from "../schemas/zod_schemas";
import { db } from "../db";
import { workoutCardTable, workoutPlanTable } from "../db/schema";

const app = new Hono()
  .get("/", (c) => c.json({ msg: "Working" }))
  .post("/", zValidator("json", WorkoutSchema), async (c) => {
    const validatedWorkout = c.req.valid("json");
    const { planId } = await db
      .insert(workoutPlanTable)
      .values({ workoutPlanTitle: validatedWorkout.workoutPlanTitle })
      .returning({ planId: workoutPlanTable.workoutPlanId })
      .then((res) => res[0]);
    if (!planId)
      return c.json({ msg: "An error occurred while inserting new plan" }, 400);
    const card = validatedWorkout.card;
    await db.insert(workoutCardTable).values({
      workoutPlanId: planId,
      workoutCardTitle: card.cardTitle,
      workoutCardImgUrl: card.imgUrl,
      workoutCardPrice: card.price,
      workoutCardTargetMuscles: card.targetMuscles,
      workoutCardEquipment: card.equipment,
    });
  });

export default app;
