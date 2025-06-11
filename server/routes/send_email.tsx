import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Resend } from "resend";
import z from "zod/v4";
import MagicLink from "../../emails/magic-link";
import ResetPassword from "../../emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);
const app = new Hono()
  .post(
    "/magic_link",
    zValidator(
      "json",
      z.object({
        url: z.url(),
        email: z.email(),
      })
    ),
    async (c) => {
      const { url, email } = c.req.valid("json");
      const { data, error } = await resend.emails.send({
        from: "MateskaSport Studio <notifications@stefancodes.dev>",
        to: [email],
        subject: "Добре дошъл в екипа на MateskaSport",
        react: <MagicLink email={email} url={url} />,
      });
      if (error) {
        return c.json(error, 400);
      }

      return c.json(data);
    }
  )
  .post(
    "/reset_password",
    zValidator(
      "json",
      z.object({
        url: z.url(),
        name: z.string(),
        email: z.email(),
      })
    ),
    async (c) => {
      const { url, name, email } = c.req.valid("json");
      const { data, error } = await resend.emails.send({
        from: "MateskaSport Studio <notifications@stefancodes.dev>",
        to: [email],
        subject: "Смени паролата си",
        react: <ResetPassword name={name} url={url} />,
      });
      if (error) {
        return c.json(error, 400);
      }

      return c.json(data);
    }
  );

export default app;
