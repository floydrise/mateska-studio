import { z } from "zod/v4";
import {
  PatchCardSchema,
  PatchSectionsFormSchema,
  PatchSectionsSchema,
  SelectCardSchema,
  WorkoutSchema,
} from "../server/schemas/zod_schemas";
import "@better-auth/stripe";

export type WorkoutCardType = z.infer<typeof SelectCardSchema>;
declare module "@better-auth/stripe" {
  interface Subscription {
    limits: {
      workoutPlanId: number;
    };
  }
}

export interface UserWorkoutType {
  planTitle: string;
  sections: {
    sectionId: number;
    sectionTitle: string;
    sectionPosition: number;
    sessions: {
      sessionTitle: string;
      videoUrl: string;
      description: string;
      sessionPosition: number;
    }[];
  }[];
}

export type WorkoutFormType = z.infer<typeof WorkoutSchema>;
export type PatchCardType = z.infer<typeof PatchCardSchema>;
export type PatchSectionType = z.infer<typeof PatchSectionsSchema>;
export type PatchSectionFormType = z.infer<typeof PatchSectionsFormSchema>;
