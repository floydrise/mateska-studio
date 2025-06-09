import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  PatchSectionSchema,
  PatchWorkoutPlanSchema,
} from "../schemas/zod_schemas";
import { db } from "../db";
import {
  workoutPlanTable,
  workoutSectionTable,
  workoutSessionsTable,
} from "../db/schema";
import { and, eq } from "drizzle-orm";
import { validateId } from "../utils";
import { z } from "zod";

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
  })
  .get("/:id/sections", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const sessions = await db
      .select()
      .from(workoutSectionTable)
      .where(eq(workoutSectionTable.workoutPlanId, id));
    if (sessions.length === 0) return c.json({ msg: "No sections found" }, 404);
    return c.json({ sessions });
  })
  .get(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      }),
    ),
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const section = await db
        .select()
        .from(workoutSectionTable)
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId),
          ),
        )
        .then((res) => res[0]);
      if (!section) return c.json({ msg: "No section found" }, 404);
      return c.json({ section });
    },
  )
  .delete(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      }),
    ),
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const deletedSection = await db
        .delete(workoutSectionTable)
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId),
          ),
        )
        .returning()
        .then((res) => res[0]);
      if (!deletedSection) return c.json({ msg: "No section to delete" }, 404);
      return c.json({ msg: "Successfully deleted section", deletedSection });
    },
  )
  .patch(
    "/:planId/sections/:sectionId",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      }),
    ),
    zValidator("json", PatchSectionSchema),
    async (c) => {
      const { planId, sectionId } = c.req.valid("param");
      const validatedSection = c.req.valid("json");
      const updatedSection = await db
        .update(workoutSectionTable)
        .set({ sectionTitle: validatedSection.sectionTitle })
        .where(
          and(
            eq(workoutSectionTable.workoutPlanId, planId),
            eq(workoutSectionTable.sectionId, sectionId),
          ),
        )
        .returning()
        .then((res) => res[0]);
      if (!updatedSection)
        return c.json({ msg: "No section found to update" }, 404);
      return c.json({ msg: "Successfully updated section", updatedSection });
    },
  )
  .get(
    "/:planId/sections/:sectionId/sessions",
    zValidator(
      "param",
      z.object({
        planId: z.coerce.number().positive(),
        sectionId: z.coerce.number().positive(),
      }),
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
          eq(workoutSessionsTable.sectionId, workoutSectionTable.sectionId),
        )
        .where(eq(workoutSectionTable.workoutPlanId, planId));
      if (!sessions) return c.json({ msg: "No sessions found" }, 404);
      return c.json({ sessions });
    },
  );

export default app;
