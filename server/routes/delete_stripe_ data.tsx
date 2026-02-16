import { Hono } from "hono";
import { stripeClient } from "../../auth";
import { internalMiddleware } from "../middleware/internal-middleware";
import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";
import { db } from "../db";
import { subscription } from "../db/schema/auth-schema";
import { and, eq } from "drizzle-orm";

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
        stripeCustomerId: z.string(),
      }),
    }),
  ),
  internalMiddleware,
  async (c) => {
    const { user } = c.req.valid("json");

    const userSubscription = await db
      .select()
      .from(subscription)
      .where(
        and(
          eq(subscription.referenceId, user.id),
          eq(subscription.status, "active"),
        ),
      )
      .then((res) => res[0]);

    console.log(userSubscription);

    if (userSubscription) {
      await stripeClient.subscriptions.cancel(
        userSubscription.stripeSubscriptionId!,
      );
    }
    await stripeClient.customers.del(user.stripeCustomerId!);
    return c.json({ msg: "Успешно изтри Customer в Stripe" });
  },
);

export default app;
