import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { WorkoutSchema } from "../schemas/zod_schemas";
import { db } from "../db";
import {
  workoutCardTable,
  workoutPlanTable,
  workoutSectionTable,
  workoutSessionsTable,
} from "../db/schema/schema";
import cardsRoute from "./workout_cards";
import plansRoute from "./workout_plans";
import sessionsRoute from "./workout_sessions";
import sectionsRoute from "./workout_sections";
import { z } from "zod/v4";
import { asc, eq } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth-middleware";

const app = new Hono()
  .post("/", authMiddleware, zValidator("json", WorkoutSchema), async (c) => {
    const user = c.get("user");
    if (user?.role !== "admin") {
      return c.json({ msg: "Unauthorised" }, 401);
    }
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
      stripePriceId: card.stripePriceId,
    });

    for (const section of validatedWorkout.sections) {
      const { sectionId } = await db
        .insert(workoutSectionTable)
        .values({
          workoutPlanId: planId,
          sectionTitle: section.sectionTitle,
          position: section.sectionPosition,
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
          position: session.sessionPosition,
        });
      }
    }

    return c.json({ msg: "Workout successfully created" }, 201);
  })
  .get(
    "/workout_info/:workout_plan_id",
    zValidator(
      "param",
      z.object({
        workout_plan_id: z.coerce.number().positive(),
      })
    ),
    async (c) => {
      const { workout_plan_id: workoutPlanId } = c.req.valid("param");
      const workoutDbRes = await db
        .select({
          workoutTitle: workoutPlanTable.workoutPlanTitle,
        })
        .from(workoutPlanTable)
        .where(eq(workoutPlanTable.workoutPlanId, workoutPlanId));

      if (workoutDbRes.length === 0) {
        return c.json({ msg: "тренировката не е намерена" }, 404);
      }
      const workoutTitle = workoutDbRes[0].workoutTitle;
      const rawSections = await db
        .select({
          sectionId: workoutSectionTable.sectionId,
          sectionTitle: workoutSectionTable.sectionTitle,
          sectionPosition: workoutSectionTable.position,
          sessionId: workoutSessionsTable.workoutSessionId,
          sessionTitle: workoutSessionsTable.sessionTitle,
          sessionVideoUrl: workoutSessionsTable.sessionVideoUrl,
          sessionDescription: workoutSessionsTable.sessionDescription,
          sessionPosition: workoutSessionsTable.position,
        })
        .from(workoutSectionTable)
        .innerJoin(
          workoutSessionsTable,
          eq(workoutSessionsTable.sectionId, workoutSectionTable.sectionId)
        )
        .where(eq(workoutSectionTable.workoutPlanId, workoutPlanId))
        .orderBy(
          asc(workoutSectionTable.position),
          asc(workoutSessionsTable.position)
        );

      let sections: {
        sectionId: number;
        sectionTitle: string;
        sectionPosition: number;
        sessions: {
          sessionId: number;
          sessionTitle: string;
          videoUrl: string;
          description: string;
          sessionPosition: number;
        }[];
      }[] = [];

      for (const row of rawSections) {
        let section = sections.find((s) => s.sectionId === row.sectionId);

        if (!section) {
          section = {
            sectionId: row.sectionId,
            sectionTitle: row.sectionTitle,
            sectionPosition: row.sectionPosition,
            sessions: [],
          };
          sections.push(section);
        }

        section.sessions.push({
          sessionId: row.sessionId,
          sessionTitle: row.sessionTitle,
          videoUrl: row.sessionVideoUrl,
          description: row.sessionDescription,
          sessionPosition: row.sessionPosition,
        });
      }

      return c.json({ planTitle: workoutTitle, sections });
    }
  )
  .route("/plans", plansRoute)
  .route("/cards", cardsRoute)
  .route("/sessions", sessionsRoute)
  .route("/sections", sectionsRoute);

export default app;
