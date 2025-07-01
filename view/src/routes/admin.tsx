import { CreateWorkoutCard } from "@/components/CreateWorkoutCard";
import AdminNav from "@/components/AdminNav";
import { getAuthDataQueryOptions } from "@/lib/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { ListUsers } from "@/components/ListUsers";
import { Lock } from "lucide-react";

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
    <main className="my-8 flex flex-col items-center overflow-x-auto gap-8">
      <AdminNav />
      {action === "create" ? (
        <>
          <h1 className="text-3xl md:text-4xl font-semibold">Формуляр план</h1>
          <CreateWorkoutCard />
        </>
      ) : action === "edit" ? (
        <div>
          <Lock />
        </div>
      ) : action === "list_users" ? (
        <>
          <h1 className="text-3xl md:text-4xl font-semibold">Потребители</h1>
          <div className="w-full h-fit max-w-4xl border rounded-2xl">
            <ListUsers />
          </div>
        </>
      ) : null}
    </main>
  );
}
