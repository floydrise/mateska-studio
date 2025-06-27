import { CreateWorkoutCard } from "@/components/CreateWorkoutCard";
import AdminNav from "@/components/AdminNav";
import { getAuthDataQueryOptions } from "@/lib/api";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
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
  return (
    <main className="my-8">
      <AdminNav />
      <div className="h-full m-auto my-8">
        <CreateWorkoutCard />
      </div>
    </main>
  );
}
