import { CreateWorkoutCard } from "@/components/CreateWorkoutCard";
import AdminNav from "@/components/AdminNav";
import { getAuthDataQueryOptions } from "@/lib/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";

const actionSearchSchema = z.object({
  action: fallback(z.enum(["create", "list_users", "edit"]), "create").default(
    "create"
  ),
});

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  validateSearch: zodValidator(actionSearchSchema),
  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(
      getAuthDataQueryOptions
    );
    if (data?.user.role !== "admin") {
      throw redirect({
        to: "/",
      });
    }
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Админски дашборд",
      },
      {
        title: "Admin • Mateska Studio",
      },
    ],
  }),
});

function RouteComponent() {
  const { action } = Route.useSearch();
  return (
    <main className="my-8">
      <AdminNav />
      <div className="h-full m-auto my-8">
        {action === "create" ? (
          <CreateWorkoutCard />
        ) : action === "edit" ? (
          <div>edit</div>
        ) : action === "list_users" ? (
          <div>list users</div>
        ) : null}
      </div>
    </main>
  );
}
