import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";
import { authClient } from "./auth-client";

const api = hc<AppType>("/").api;

const fetchWorkoutCards = async () => {
  const res = await api.workouts.cards.$get();
  if (!res.ok) throw new Error("couldn't fetch cards");
  return await res.json();
};

export const getWorkoutCardsQueryOptions = queryOptions({
  queryKey: ["fetch-workout-cards"],
  queryFn: fetchWorkoutCards,
  staleTime: 5 * 1000,
});

export const getUserSubscriptionsQueryOptions = queryOptions({
  queryKey: ["get-subscriptions"],
  queryFn: async () => {
    const { data: subscriptions } = await authClient.subscription.list();
    const activeSubscription = subscriptions!.find(
      (sub) => sub.status === "active" || sub.status === "trialing"
    );
    return activeSubscription;
  },
  staleTime: 5 * 1000,
});
