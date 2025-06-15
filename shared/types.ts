import { z } from "zod/v4";
import { SelectCardSchema } from "../server/schemas/zod_schemas";
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
    sessions: {
      sessionTitle: string;
      videoUrl: string;
      description: string;
    }[];
  }[];
}
