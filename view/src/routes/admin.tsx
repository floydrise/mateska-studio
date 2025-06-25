import AdminDashboard from "@/components/AdminDashboard";
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
  return <AdminDashboard />;
}
