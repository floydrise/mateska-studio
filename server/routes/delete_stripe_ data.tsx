import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth-middleware";
import { auth, stripeClient } from "../../auth";
import { internalMiddleware } from "../middleware/internal-middleware";
import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";
import { db } from "../db";
import { subscription } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        emailVerified: z.boolean(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        image: z.string().optional(),
      }),
    })
  ),
  internalMiddleware,
  async (c) => {
    const { user } = c.req.valid("json");
    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.referenceId, user.id))
      .then((res) => res[0]);

    if (userSubscription) {
      await stripeClient.subscriptions.cancel(
        userSubscription.stripeSubscriptionId!
      );
      await stripeClient.customers.del(userSubscription.stripeCustomerId!);
    }
    return c.json({ msg: "Success" });
  }
);

export default app;
