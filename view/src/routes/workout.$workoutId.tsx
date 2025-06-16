import { Skeleton } from "@/components/ui/skeleton";
import UserWorkout from "@/components/UserWorkout";
import { getUserWorkoutPlanQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout/$workoutId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workoutId } = Route.useParams();
  const { isLoading, isError, error, data } = useQuery(
    getUserWorkoutPlanQueryOptions(workoutId)
  );
  if (isLoading) {
    return (
      <div className="flex gap-1 my-2">
        <Skeleton className="h-screen w-58 lg:w-80" />
        <Skeleton className="w-3/4 h-screen" />
      </div>
    );
  }
  if (isError) return <p>An erro occurred: {error.message}</p>;
  return <UserWorkout userWorkout={data!} />;
}
