import { NewPasswordForm } from "@/components/NewPasswordForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod/v4";

const SearchParamsSchema = z.object({
  error: z.string().optional(),
  token: z.string().optional(),
});

export const Route = createFileRoute("/reset_password")({
  component: RouteComponent,
  validateSearch: zodValidator(SearchParamsSchema),
});

function RouteComponent() {
  const { error, token } = Route.useSearch();
  const navigate = useNavigate();
  if (!error && !token) navigate({ to: "/" });
  if (error)
    return <p>Срокът на токенът е изтекъл, моля изпратете ново запитване</p>;
  return (
    <section className={"m-auto px-2 max-w-sm md:max-w-md mt-40"}>
      <Card>
        <CardHeader>
          <CardTitle
            className={"text-xl justify-center items-center flex gap-1"}
          >
            Смени паролата си
          </CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <NewPasswordForm token={token!} />
        </CardContent>
      </Card>
    </section>
  );
}
