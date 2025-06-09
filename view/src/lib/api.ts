import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";

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
