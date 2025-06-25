import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db";
import * as schema from "./server/db/schema/auth-schema";
import { admin, magicLink } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { workoutCardTable } from "./server/db/schema/schema";

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await fetch(
        `${process.env.BETTER_AUTH_URL}/api/send_email/reset_password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-api-key": process.env.INTERNAL_API_KEY!,
          },
          body: JSON.stringify({
            url,
            email: user.email,
            name: user.name,
          }),
        }
      );
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["facebook", "google"],
    },
  },
  plugins: [
    admin(),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await fetch(
          `${process.env.BETTER_AUTH_URL}/api/send_email/magic_link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-internal-api-key": process.env.INTERNAL_API_KEY!,
            },
            body: JSON.stringify({
              url,
              email,
            }),
          }
        );
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      onCustomerCreate: async ({ customer, stripeCustomer, user }, request) => {
        // Do something with the newly created customer
        console.log(`Customer ${customer.id} created for user ${user.id}`);
      },

      subscription: {
        enabled: true,
        plans: async () => {
          const plans = await db
            .select({
              name: workoutCardTable.workoutCardTitle,
              priceId: workoutCardTable.stripePriceId,
              workoutPlanId: workoutCardTable.workoutPlanId,
            })
            .from(workoutCardTable);
          return plans.map((plan) => ({
            name: plan.name,
            priceId: plan.priceId,
            limits: {
              workoutPlanId: plan.workoutPlanId,
            },
          }));
        },
      },
    }),
  ],
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user, request) => {
        await fetch(`${process.env.BETTER_AUTH_URL}/api/delete_stripe_data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-api-key": process.env.INTERNAL_API_KEY!,
          },
          body: JSON.stringify({
            user,
          }),
        });
      },
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        await fetch(`${Bun.env.BETTER_AUTH_URL}/api/send_email/delete_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-api-key": process.env.INTERNAL_API_KEY!,
          },
          body: JSON.stringify({
            url: url,
            user_email: user.email,
            user_name: user.name,
          }),
        });
      },
    },
  },
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
});
