import { Hono } from "hono";
import { db } from "../db";
import { workoutCardTable } from "../db/schema/schema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { PatchCardSchema } from "../schemas/zod_schemas";
import { validateId } from "../utils";

const app = new Hono()
  .get("/", async (c) => {
    const workoutCards = await db.select().from(workoutCardTable);
    return c.json({ cards: workoutCards });
  })
  .get("/:id", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const card = await db
      .select()
      .from(workoutCardTable)
      .where(eq(workoutCardTable.workoutCardId, id))
      .then((res) => res[0]);
    if (!card) return c.json({ msg: "Not found" }, 404);
    return c.json({ card });
  })
  .delete("/:id", validateId, async (c) => {
    const { id } = c.req.valid("param");
    const deletedCard = await db
      .delete(workoutCardTable)
      .where(eq(workoutCardTable.workoutCardId, id))
      .returning()
      .then((res) => res[0]);
    if (!deletedCard)
      return c.json({ msg: "Couldn't find a card with this ID" }, 404);
    return c.json({ msg: "Successfully deleted the card", deletedCard });
  })
  .patch("/:id", validateId, zValidator("json", PatchCardSchema), async (c) => {
    const { id } = c.req.valid("param");
    const validatedBody = c.req.valid("json");
    const updatedCard = await db
      .update(workoutCardTable)
      .set(validatedBody)
      .where(eq(workoutCardTable.workoutCardId, id))
      .returning()
      .then((res) => res[0]);
    if (!updatedCard)
      return c.json(
        { msg: "Couldn't find a card with this ID to update" },
        404
      );
    return c.json({ msg: "Successfully updated the card", updatedCard }, 200);
  });

export default app;
