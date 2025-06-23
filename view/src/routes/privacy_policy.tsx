import PrivacyPolicy from "@/components/PrivacyPolicy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy_policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-2">
      <PrivacyPolicy />
    </main>
  );
}
