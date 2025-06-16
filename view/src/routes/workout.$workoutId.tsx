import { Skeleton } from "@/components/ui/skeleton";
import UserWorkout from "@/components/UserWorkout";
import {
  getAuthDataQueryOptions,
  getUserSubscriptionsQueryOptions,
  getUserWorkoutPlanQueryOptions,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/workout/$workoutId")({
  component: RouteComponent,
  beforeLoad: async ({ location, params, context }) => {
    const data = await context.queryClient.ensureQueryData(
      getAuthDataQueryOptions
    );
    if (!data?.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    const activeSubscription = await context.queryClient.ensureQueryData(
      getUserSubscriptionsQueryOptions
    );
    if (
      String(activeSubscription?.limits.workoutPlanId) !== params.workoutId &&
      activeSubscription !== null
    ) {
      throw redirect({
        to: "/profile",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const { workoutId } = Route.useParams();
  const { isLoading, isError, error, data } = useQuery(
    getUserWorkoutPlanQueryOptions(workoutId)
  );
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex gap-1 my-2">
        <Skeleton className="h-screen w-58 lg:w-80" />
        <Skeleton className="w-3/4 h-screen" />
      </div>
    );
  }

  if (isError) {
    navigate({ to: "/" });
    toast.error("Изникна грешка: " + error.message);
    return;
  }
  return <UserWorkout userWorkout={data!} />;
}
