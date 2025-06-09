import { z } from "zod/v4";
import { SelectCardSchema } from "../server/schemas/zod_schemas";

export type WorkoutCardType = z.infer<typeof SelectCardSchema>;
