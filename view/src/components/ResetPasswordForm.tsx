import { Info, Loader, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import z from "zod/v4";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LoginSchema = z.object({
  email: z.email({ error: "Нужен е валиден имейл" }),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">
          • {field.state.meta.errors.map((err) => err.message).join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export const ResetPasswordForm = () => {
  let toastId: string | number;
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: "http://localhost:5173/reset_password",
        },
        {
          onRequest: () => {
            toastId = toast.loading("Зарежда");
          },
          onSuccess: () => {
            toast.dismiss(toastId);
            toast.success("Проверете имейлът си 😊");
            navigate({ to: "/" });
          },
          onError: (ctx) => {
            toast.dismiss(toastId);
            toast.error("Изникна грешка" + ctx.error.message);
            form.reset();
          },
        }
      );
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-2"
    >
      <div>
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <div className="flex items-center mb-2 gap-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Имейл
                  </Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Ще изпратим линк за смяна на паролата на имейлът, който
                        въведеш
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className="transition duration-500 hover:scale-105"
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Изпрати <Send />
              </span>
            )}
          </Button>
        )}
      />
    </form>
  );
};
