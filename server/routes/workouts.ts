import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { WorkoutSchema } from "../schemas/zod_schemas";
import { db } from "../db";
import {
  workoutCardTable,
  workoutPlanTable,
  workoutSectionTable,
  workoutSessionsTable,
} from "../db/schema";
import cardsRoute from "./workout_cards";
import plansRoute from "./workout_plans";
import sectionsRoute from "./workout_sections";

const app = new Hono()
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

    for (const section of validatedWorkout.sections) {
      const { sectionId } = await db
        .insert(workoutSectionTable)
        .values({
          workoutPlanId: planId,
          sectionTitle: section.sectionTitle,
        })
        .returning({ sectionId: workoutSectionTable.sectionId })
        .then((res) => res[0]);

      if (!sectionId) continue;

      for (const session of section.sessions) {
        await db.insert(workoutSessionsTable).values({
          sectionId,
          sessionTitle: session.sessionTitle,
          sessionVideoUrl: session.videoUrl,
          sessionDescription: session.description,
        });
      }
    }

    return c.json({ msg: "Workout successfully created" }, 201);
  })
  .route("/plans", plansRoute)
  .route("/cards", cardsRoute)
  .route("/sections", sectionsRoute);

export default app;
