import SubscriptionCard from "@/components/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { getUserSubscriptionsQueryOptions } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Subscription } from "@better-auth/stripe";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { Calendar, Loader, LogOut, Mail, Trash, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: authData, isPending } = authClient.useSession();
  const user = authData?.user;
  const { data, isLoading, isError, error } = useQuery(
    getUserSubscriptionsQueryOptions
  );
  const navigate = useNavigate();
  if (isError) console.log("Изинка грешка: " + error.message);
  return (
    <section className="mt-10 flex flex-col justify-center items-center w-full">
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="max-w-fit">
          <h1 className="text-2xl md:text-4xl font-bold">Моите данни:</h1>
          <div className="mt-2">
            <p className="flex items-center text-xl gap-1 text-muted-foreground">
              <User /> Име: {user?.name}
            </p>
            <p className="flex items-center text-xl gap-1 text-muted-foreground">
              <Mail /> Email: {user?.email}
            </p>
            <p className="flex items-center text-xl gap-1 text-muted-foreground">
              <Calendar /> Регистриран на:{" "}
              {format(user?.createdAt!, "dd/MM/yyyy")}
            </p>
            <div className="w-full flex justify-between gap-2 mt-2">
              <Button
                onClick={async () =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => navigate({ to: "/" }) },
                  })
                }
                variant={"outline"}
                className="flex-1 transition duration-300 hover:scale-105"
              >
                <LogOut /> Излез
              </Button>
              <Button
                variant={"destructive"}
                className="flex-1 transition duration-300 hover:scale-105"
              >
                <Trash /> Изтрии
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="my-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Моите продукти:</h1>
        {isLoading ? (
          "Зарежда"
        ) : data !== undefined ? (
          <SubscriptionCard subscription={data as Subscription} />
        ) : (
          "Все още няма абонаменти"
        )}
      </div>
    </section>
  );
}
