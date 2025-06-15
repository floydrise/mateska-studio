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
    return <p>Loading ...</p>;
  }
  if (isError) return <p>An erro occurred: {error.message}</p>;
  return <UserWorkout userWorkout={data!} />;
}
