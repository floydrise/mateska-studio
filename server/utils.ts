import { zValidator } from "@hono/zod-validator";
import { IdParamSchema } from "./schemas/zod_schemas";

export const validateId = zValidator("param", IdParamSchema);
