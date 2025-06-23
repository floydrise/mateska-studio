import TermsOfUse from "@/components/TermsOfUse";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms_of_use")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-2">
      <TermsOfUse />
    </main>
  );
}
