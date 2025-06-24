import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  PatchSectionSchema,
  PatchWorkoutPlanSchema,
  PostSectionSchema,
  PostSessionSchema,
} from "../schemas/zod_schemas";
import { db } from "../db";
import {
  workoutPlanTable,
  workoutSectionTable,
  workoutSessionsTable,
} from "../db/schema/schema";
import { and, asc, eq } from "drizzle-orm";
import { validateId } from "../utils";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth-middleware";

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
    authMiddleware,
    zValidator("json", PatchWorkoutPlanSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const validatedPlan = c.req.valid("json");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
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
        200
      );
    }
  )
  .delete("/:id", validateId, authMiddleware, async (c) => {
    const { id } = c.req.valid("param");
    const user = c.get("user");
    if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
    const deletedPlan = await db
      .delete(workoutPlanTable)
      .where(eq(workoutPlanTable.workoutPlanId, id))
      .returning()
      .then((res) => res[0]);
    if (!deletedPlan) return c.json({ msg: "No plan found to delete" }, 404);
    return c.json(
      { msg: "Successfully deleted the workout plan", deletedPlan },
      200
    );
  })
  .get("/:id/sections", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const sections = await db
      .select()
      .from(workoutSectionTable)
      .where(eq(workoutSectionTable.workoutPlanId, id))
      .orderBy(asc(workoutSectionTable.position));
    if (sections.length === 0) return c.json({ msg: "No sections found" }, 404);
    return c.json({ sections });
  })
  .get(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      })
    ),
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const section = await db
        .select()
        .from(workoutSectionTable)
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId)
          )
        )
        .then((res) => res[0]);
      if (!section) return c.json({ msg: "No section found" }, 404);
      return c.json({ section });
    }
  )
  .delete(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      })
    ),
    authMiddleware,
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const deletedSection = await db
        .delete(workoutSectionTable)
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId)
          )
        )
        .returning()
        .then((res) => res[0]);
      if (!deletedSection) return c.json({ msg: "No section to delete" }, 404);
      return c.json({ msg: "Successfully deleted section", deletedSection });
    }
  )
  .patch(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      })
    ),
    zValidator("json", PatchSectionSchema),
    authMiddleware,
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const validatedSection = c.req.valid("json");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const updatedSection = await db
        .update(workoutSectionTable)
        .set({ sectionTitle: validatedSection.sectionTitle })
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId)
          )
        )
        .returning()
        .then((res) => res[0]);
      if (!updatedSection)
        return c.json({ msg: "No section found to update" }, 404);
      return c.json({ msg: "Successfully updated section", updatedSection });
    }
  )
  .get(
    "/:planId/sections/:sectionId/sessions",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      })
    ),
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const sessions = await db
        .select({
          sessionId: workoutSessionsTable.workoutSessionId,
          sectionId: workoutSessionsTable.sectionId,
          sessionTitle: workoutSessionsTable.sessionTitle,
          sessionVideoUrl: workoutSessionsTable.sessionVideoUrl,
          sessionDescription: workoutSessionsTable.sessionDescription,
        })
        .from(workoutSessionsTable)
        .innerJoin(
          workoutSectionTable,
          eq(workoutSessionsTable.sectionId, workoutSectionTable.sectionId)
        )
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId)
          )
        );
      if (sessions.length === 0)
        return c.json({ msg: "No sessions found" }, 404);
      return c.json({ sessions });
    }
  )
  .get(
    "/:planId/sections/:sectionId/sessions/:sessionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
        sessionId: z.coerce.number().positive(),
      })
    ),
    async (c) => {
      const { planId, sectionId, sessionId } = c.req.valid("param");
      const session = await db
        .select({
          sessionId: workoutSessionsTable.workoutSessionId,
          sectionId: workoutSessionsTable.sectionId,
          sessionTitle: workoutSessionsTable.sessionTitle,
          sessionVideoUrl: workoutSessionsTable.sessionVideoUrl,
          sessionDescription: workoutSessionsTable.sessionDescription,
        })
        .from(workoutSessionsTable)
        .innerJoin(
          workoutSectionTable,
          eq(workoutSessionsTable.sectionId, workoutSectionTable.sectionId)
        )
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSessionsTable.workoutSessionId, sessionId),
            eq(workoutSectionTable.sectionId, sectionId)
          )
        )
        .then((res) => res[0]);
      if (!session) return c.json({ msg: "No session found" }, 404);
      return c.json({ session });
    }
  )
  .post(
    "/:planId/sections/:sectionId/sessions",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      })
    ),
    zValidator("json", PostSessionSchema),
    authMiddleware,
    async (c) => {
      const { sectionId } = c.req.valid("param");
      const validatedSession = c.req.valid("json");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const newSession = await db
        .insert(workoutSessionsTable)
        .values({ ...validatedSession, sectionId })
        .returning()
        .then((res) => res[0]);
      if (!newSession)
        return c.json({ msg: "Could not create new workout session" }, 400);
      return c.json(
        { msg: "Successfully created new session", newSession },
        201
      );
    }
  )
  .post(
    "/:planId/sections",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
      })
    ),
    zValidator("json", PostSectionSchema),
    authMiddleware,
    async (c) => {
      const { planId } = c.req.valid("param");
      const validatedSection = c.req.valid("json");
      const user = c.get("user");
      if (user?.role !== "admin") return c.json({ msg: "Not authorised" }, 401);
      const { sectionId } = await db
        .insert(workoutSectionTable)
        .values({
          workoutPlanId: planId,
          sectionTitle: validatedSection.sectionTitle,
          position: validatedSection.position,
        })
        .returning({ sectionId: workoutSectionTable.sectionId })
        .then((res) => res[0]);
      const sessions = validatedSection.sessions;
      for (const session of sessions) {
        const newSession = await db
          .insert(workoutSessionsTable)
          .values({
            sectionId,
            sessionDescription: session.description,
            sessionTitle: session.sessionTitle,
            sessionVideoUrl: session.videoUrl,
            position: session.position,
          })
          .returning()
          .then((res) => res[0]);
        if (!newSession) continue;
      }
      return c.json({ msg: "Successfully created section with sessions" }, 201);
    }
  );

export default app;
