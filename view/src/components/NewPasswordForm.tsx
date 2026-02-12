import { Eye, EyeClosed, Loader, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import z from "zod/v4";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const LoginSchema = z.object({
  password: z
    .string()
    .min(8, "Най-малко 8 знака")
    .max(128, "Най-много 128")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Поне 1 главна буква",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Поне 1 малка буква",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Поне 1 цифра",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Поне 1 специален символ (!@#$%^&*)",
    }),
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

export const NewPasswordForm = ({ token }: { token: string }) => {
  let toastId: string | number;
  const navigate = useNavigate();
  const [eyeIcon, setEyeIcon] = useState<boolean>(false);
  const [type, setType] = useState("password");
  const handleToggle = () => {
    if (type === "password") {
      setEyeIcon(true);
      setType("text");
    } else {
      setEyeIcon(false);
      setType("password");
    }
  };
  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.resetPassword(
        {
          newPassword: value.password,
          token,
        },
        {
          onRequest: () => {
            toastId = toast.loading("Зарежда");
          },
          onSuccess: () => {
            toast.dismiss(toastId);
            toast.success("Успешно обновихте паролата си");
            navigate({ to: "/login" });
          },
          onError: (ctx) => {
            toast.dismiss(toastId);
            toast.error(
              "Изникна грешка: " + ctx.error.message + "\nМоля опитайте отново",
            );
            navigate({ to: "/" });
          },
        },
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
          name="password"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name} className="mb-2">
                  Нова парола
                </Label>
                <div className="flex">
                  <Input
                    type={type}
                    placeholder="Password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <span
                    className="flex justify-around items-center hover:cursor-pointer"
                    onClick={handleToggle}
                  >
                    {eyeIcon ? (
                      <Eye className="absolute mr-10" />
                    ) : (
                      <EyeClosed className="absolute mr-10" />
                    )}
                  </span>
                </div>
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
