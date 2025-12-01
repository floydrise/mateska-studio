import SubscriptionCard from "@/components/SubscriptionCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAuthDataQueryOptions,
  getUserSubscriptionsQueryOptions,
  listUserAccountsQueryOptions,
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
import { useState } from "react";
import { TDEECalc } from "@/components/TDEECalc";
import { UserInfoSection } from "@/components/UserInfoSection";

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
  const [password, setPassword] = useState("");

  const { data: authData, isPending } = authClient.useSession();
  const { data: accountsList } = useQuery(listUserAccountsQueryOptions);
  const hasPassword = accountsList?.some(
    (acc) => acc.providerId === "credential"
  );

  const user = authData?.user;
  const navigate = useNavigate();

  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useQuery(getUserSubscriptionsQueryOptions);

  if (isError) console.log("Изинка грешка: " + error.message);

  return (
    <section className="my-10 flex justify-center">
      {/* === THREE SECTIONS WRAPPED HERE === */}
      <div className="w-full xl:mx-10 flex flex-col justify-center items-center xl:items-start xl:flex-row gap-10">
        {/* АБОНАМЕНТ */}
        <section className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Абонамент:</h1>

          {isLoading ? (
            <Skeleton className="h-130 w-full" />
          ) : subscription ? (
            <SubscriptionCard subscription={subscription as Subscription} />
          ) : (
            <span className="text-muted-foreground">
              Все още нямате абонаменти. Вземи от{" "}
              <Link to="/" hash="products" className="underline">
                тук
              </Link>
            </span>
          )}
        </section>

        {/* КАЛКУЛАТОР */}
        <section className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Калкулатор:</h1>
          <TDEECalc />
        </section>

        {/* ДАННИ */}
        <section className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Данни:</h1>

          {isPending ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <UserInfoSection
              user={user!}
              hasPassword={!!hasPassword}
              password={password}
              setPassword={setPassword}
              navigate={navigate}
            />
          )}
        </section>
      </div>
    </section>
  );
}
