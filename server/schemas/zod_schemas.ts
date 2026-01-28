import { z } from "zod/v4";
import {
  workoutCardTable,
  workoutPlanTable,
  workoutSectionTable,
  workoutSessionsTable,
} from "../db/schema/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { user } from "../db/schema/auth-schema";

export const WorkoutSchema = z.object({
  workoutPlanTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
  card: z.object({
    cardTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
    imgUrl: z
      .url({ error: "Невалиден линк" })
      .nonempty("Трябва да добавиш URL на снимка"),
    stripePriceId: z.string().min(3, "Трябва да е най-малко 3 букви"),
    price: z.number().nonnegative("Не може да е по-малко от 0"),
    targetMuscles: z
      .array(z.string().min(3, "Трябва да е най-малко 3 букви"))
      .min(1, "Трябва да добавиш поне 1 мускулна група"),
    equipment: z
      .array(z.string())
      .min(1, "Трябва да добавиш поне 1 оборудване"),
  }),
  sections: z
    .array(
      z.object({
        sectionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
        sectionPosition: z.number().positive(),
        sessions: z
          .array(
            z.object({
              sessionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
              sessionPosition: z.number().positive(),
              videoUrl: z.url("Must be a URL"),
              description: z.string().min(3, "Трябва да е най-малко 3 букви"),
            }),
          )
          .min(1, "Трябва да добавиш поне 1 сесия"),
      }),
    )
    .min(1, "Трябва да добавиш поне 1 секция"),
});

export const IdParamSchema = z.object({
  id: z.coerce.number().positive(),
});

export const PatchCardSchema = createUpdateSchema(workoutCardTable, {
  workoutCardEquipment: (schema) => schema.optional(),
  workoutCardPrice: (schema) => schema.nonnegative().optional(),
  workoutCardImgUrl: (schema) => schema.optional(),
  workoutCardTargetMuscles: (schema) => schema.optional(),
  workoutCardTitle: (schema) =>
    schema.min(3, "Трябва да е най-малко 3 букви").optional(),
}).omit({ workoutCardCreatedAt: true });

export const SelectCardSchema = createSelectSchema(workoutCardTable).omit({
  workoutCardCreatedAt: true,
});

export const PatchWorkoutPlanSchema = createUpdateSchema(workoutPlanTable, {
  workoutPlanTitle: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
});

export const PatchSectionSchema = createUpdateSchema(workoutSectionTable, {
  sectionTitle: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
  position: (schema) => schema.positive({ error: "Трябва да е повече от 0" }),
  sessions: z.array(
    z.object({
      sessionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
      sessionPosition: z
        .number()
        .positive({ error: "Трябва да е повече от 0" }),
      videoUrl: z.url("Must be a URL"),
      description: z.string().min(3, "Трябва да е най-малко 3 букви"),
    }),
  ),
});

export const PatchSectionsSchema = z.array(
  z.object({
    sectionId: z.number().optional(),
    sectionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
    sectionPosition: z.number().positive({ error: "Трябва да е повече от 0" }),
    sessions: z
      .array(
        z.object({
          sessionId: z.number().optional(),
          sessionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
          sessionPosition: z
            .number()
            .positive({ error: "Трябва да е повече от 0" }),
          videoUrl: z.url("Must be a URL"),
          description: z.string().min(3, "Трябва да е най-малко 3 букви"),
        }),
      )
      .min(1, "Трябва да добавиш поне 1 сесия"),
  }),
);

export const PatchSectionsFormSchema = z.object({
  sections: PatchSectionsSchema,
});

export const PatchSessionSchema = createUpdateSchema(workoutSessionsTable, {
  sessionTitle: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
  sessionDescription: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
  sessionVideoUrl: (schema) => schema.min(3, "Трябва да е най-малко 3 букви"),
});

export const PostSessionSchema = createInsertSchema(workoutSessionsTable, {
  sessionTitle: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
  sessionDescription: (schema) => schema.min(3, "Трябва да е поне 3 букви"),
  sessionVideoUrl: (schema) => schema.min(3, "Трябва да е най-малко 3 букви"),
});

export const PostSectionSchema = z.object({
  sectionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
  sessions: z
    .array(
      z.object({
        sessionTitle: z.string().min(3, "Трябва да е най-малко 3 букви"),
        videoUrl: z.url("Must be a URL"),
        description: z.string().min(3, "Трябва да е най-малко 3 букви"),
        position: z.number().positive(),
      }),
    )
    .min(1, "Трябва да добавиш поне 1 сесия"),
  position: z.number().positive(),
});

export const UserSelectSchema = createSelectSchema(user);
