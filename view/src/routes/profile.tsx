import SubscriptionCard from "@/components/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAuthDataQueryOptions,
  getUserSubscriptionsQueryOptions,
} from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Subscription } from "@better-auth/stripe";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { format } from "date-fns";
import { Calendar, LogOut, Mail, Trash, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
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
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Потребителски профил - лична данни и абонаменти",
      },
      {
        title: "Profile • Mateska Studio",
      },
    ],
  }),
});

function RouteComponent() {
  const { data: authData, isPending } = authClient.useSession();
  const user = authData?.user;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery(
    getUserSubscriptionsQueryOptions
  );
  if (isError) console.log("Изинка грешка: " + error.message);
  return (
    <section className="mt-10 flex flex-col justify-center items-center w-full">
      <div>
        <div className="max-w-fit">
          <h1 className="text-2xl md:text-4xl font-bold">Данни:</h1>
          {isPending ? (
            <Skeleton className="h-40 w-80" />
          ) : (
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
          )}
        </div>
        <div className="my-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Абонамент:</h1>
          {isLoading ? (
            <Skeleton className="h-48 w-90" />
          ) : data ? (
            <SubscriptionCard subscription={data as Subscription} />
          ) : (
            <span className="text-muted-foreground">
              Все още нямате абонаменти. Вземи от{" "}
              <Link to="/" className="underline">
                тук
              </Link>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
