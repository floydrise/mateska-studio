import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins";

const baseURL = import.meta.env.VITE_APP_URL;
export const authClient = createAuthClient({
  baseURL,
  plugins: [
    magicLinkClient(),
    stripeClient({
      subscription: true,
    }),
    adminClient(),
  ],
});
