import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const ErrorSearchParams = z.object({
  error: z.string().optional(),
});
export const Route = createFileRoute("/")({
  component: App,
  validateSearch: zodValidator(ErrorSearchParams),
});

function App() {
  const { error } = Route.useSearch();
  if (error === "INVALID_TOKEN")
    return <p>Срокът на логин токенът е изтекъл, моля логнете се отново</p>;
  return <div id="top">Howdy</div>;
}
