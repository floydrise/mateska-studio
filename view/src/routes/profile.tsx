import SubscriptionCard from "@/components/SubscriptionCard";
import { getUserSubscriptionsQueryOptions } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Mail, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: authData } = authClient.useSession();
  const user = authData?.user;
  const { data, isLoading, isError, error } = useQuery(
    getUserSubscriptionsQueryOptions
  );
  if (isError) return <p>Изинка грешка: {error.message}</p>;
  return (
    <section className="mt-20 ml-20">
      <div>
        <h1 className="text-4xl font-bold">Моят профил:</h1>
        <div className="ml-4 mt-2">
          <p className="flex items-center text-xl gap-1 text-muted-foreground">
            <User /> Име: {user?.name}
          </p>
          <p className="flex items-center text-xl gap-1 text-muted-foreground">
            <Mail /> Email: {user?.email}
          </p>
          <p className="flex items-center text-xl gap-1 text-muted-foreground">
            <Calendar /> Създаден на: {user?.createdAt.toDateString()}
          </p>
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-4xl font-bold">Моите продукти:</h1>
        {isLoading ? (
          "Зарежда"
        ) : data ? (
          <SubscriptionCard subscription={data!} />
        ) : (
          "Все още няма абонаменти"
        )}
      </div>
    </section>
  );
}
