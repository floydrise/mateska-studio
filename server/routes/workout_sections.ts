import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod/v4";
import { authMiddleware } from "../middleware/auth-middleware";
import { PatchSectionsFormSchema } from "../schemas/zod_schemas";
import { db } from "../db";
import { workoutSectionTable, workoutSessionsTable } from "../db/schema/schema";
import { eq } from "drizzle-orm";

const app = new Hono().put(
  "/:planId",
  zValidator("param", z.object({ planId: z.coerce.number().positive() })),
  zValidator("json", PatchSectionsFormSchema),
  authMiddleware,
  async (c) => {
    const user = c.get("user");
    if (user?.role !== "admin") {
      return c.json({ msg: "Not authorised" }, 401);
    }
    const { planId } = c.req.valid("param");
    const { sections } = c.req.valid("json");
    try {
      await db.transaction(async (tx) => {
        for (const section of sections) {
          let sectionId = section.sectionId;
          if (sectionId) {
            await tx
              .update(workoutSectionTable)
              .set({
                sectionTitle: section.sectionTitle,
                position: section.sectionPosition,
              })
              .where(eq(workoutSectionTable.sectionId, sectionId));
          } else {
            const newSection = await tx
              .insert(workoutSectionTable)
              .values({
                sectionTitle: section.sectionTitle,
                position: section.sectionPosition,
                workoutPlanId: planId,
              })
              .returning()
              .then((res) => res[0]);
            sectionId = newSection.sectionId;
          }

          for (const session of section.sessions) {
            if (session.sessionId) {
              await tx
                .update(workoutSessionsTable)
                .set({
                  sessionTitle: session.sessionTitle,
                  sessionVideoUrl: session.videoUrl,
                  sessionDescription: session.description,
                  position: session.sessionPosition,
                })
                .where(
                  eq(workoutSessionsTable.workoutSessionId, session.sessionId)
                );
            } else {
              await tx.insert(workoutSessionsTable).values({
                sessionTitle: session.sessionTitle,
                sessionVideoUrl: session.videoUrl,
                sessionDescription: session.description,
                position: session.sessionPosition,
                sectionId,
              });
            }
          }
        }
      });
      return c.json({ msg: "Successfully updated info" });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          msg:
            error instanceof Error
              ? error.message
              : "Грешка от сървъра - /api/workouts/sections",
        },
        500
      );
    }
  }
);

export default app;
