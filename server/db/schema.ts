import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const workoutPlanTable = pgTable("workout_plan", {
  workoutPlanId: serial("workout_plan_id").primaryKey(),
  workoutPlanTitle: text("workout_plan_title").notNull(),
  workoutPlanCreatedAt: timestamp("workout_plan_created_at")
    .notNull()
    .defaultNow(),
});

export const workoutCardTable = pgTable("workout_card", {
  workoutCardId: serial("workout_card_id").primaryKey(),
  workoutPlanId: integer("workout_plan_id")
    .notNull()
    .references(() => workoutPlanTable.workoutPlanId, { onDelete: "cascade" }),
  workoutCardTitle: text("workout_card_title").notNull(),
  workoutCardImgUrl: text("workout_card_img_url").notNull(),
  workoutCardPrice: integer("workout_card_price").notNull(),
  workoutCardTargetMuscles: text("workout_card_target_muscles")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  workoutCardEquipment: text("workout_card_equipment")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  workoutCardCreatedAt: timestamp("workout_card_created_at")
    .notNull()
    .defaultNow(),
});

export const workoutSectionTable = pgTable("workout_section", {
  sectionId: serial("section_id").primaryKey(),
  workoutPlanId: integer()
    .notNull()
    .references(() => workoutPlanTable.workoutPlanId, { onDelete: "cascade" }),
  sectionTitle: text("section_title").notNull(),
});

export const workoutSessionsTable = pgTable("workout_session", {
  workoutSessionId: serial("workout_session_id").primaryKey(),
  sectionId: integer("section_id")
    .notNull()
    .references(() => workoutSectionTable.sectionId, { onDelete: "cascade" }),
  sessionTitle: text("session_title").notNull(),
  sessionVideoUrl: text("session_video_url").notNull(),
  sessionDescription: text("session_description").notNull(),
});
