import { z } from "zod";
import { SelectCardSchema } from "../server/schemas/zod_schemas";

export type WorkoutCardType = z.infer<typeof SelectCardSchema>;
