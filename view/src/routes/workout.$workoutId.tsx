import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout/$workoutId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workoutId } = Route.useParams();
  return <div>Hello "/workout/{workoutId}"!</div>;
}
