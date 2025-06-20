import WorkoutCard from "@/components/WorkoutCard";
import { getWorkoutCardsQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/workouts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, error, data, isError } = useQuery(
    getWorkoutCardsQueryOptions
  );
  if (isError) toast.error("Изникна грешка: " + error.message);
  if (isLoading) return <h1>Loading ...</h1>;
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 my-10"
      }
    >
      {data?.cards.map((card) => (
        <WorkoutCard key={card.workoutCardId} workoutCard={card} />
      ))}
    </div>
  );
}
