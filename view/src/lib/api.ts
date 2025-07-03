import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";
import { authClient } from "./auth-client";
import type { Subscription } from "@better-auth/stripe";
import type { PatchCardType, WorkoutFormType } from "../../../shared/types";

const api = hc<AppType>("/").api;

const fetchWorkoutCards = async () => {
  const res = await api.workouts.cards.$get();
  if (!res.ok) throw new Error("couldn't fetch cards");
  return await res.json();
};

const fetchUserWorkout = async (workoutPlanId: string) => {
  const res = await api.workouts.workout_info[":workout_plan_id"].$get({
    param: {
      workout_plan_id: workoutPlanId,
    },
  });
  if (!res.ok) {
    const errRes = await res.json();
    if ("msg" in errRes) {
      throw new Error(errRes.msg);
    }
    throw new Error("грешка при извличането на информация");
  }
  return await res.json();
};

export const fetchUserActiveSubscriptions = async () => {
  const { data: subscriptions } = await authClient.subscription.list();
  if (subscriptions?.length === 0) return null;
  const activeSubscription = subscriptions!.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );
  return activeSubscription as Subscription;
};

export const fetchAuthData = async () => {
  const { data } = await authClient.getSession();
  return data;
};

export const fetchUserAccountList = async () => {
  const { data, error } = await authClient.listAccounts();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const postNewWorkoutPlan = async (workoutInfo: WorkoutFormType) => {
  const {
    workoutPlanTitle,
    card: { cardTitle, imgUrl, stripePriceId, price, targetMuscles, equipment },
    sections,
  } = workoutInfo;
  const res = await api.workouts.$post({
    json: {
      workoutPlanTitle,
      card: {
        cardTitle,
        imgUrl,
        stripePriceId,
        price,
        equipment,
        targetMuscles,
      },
      sections,
    },
  });

  return await res.json();
};

export const listAllUsers = async () => {
  const { data, error } = await authClient.admin.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchAllWorkoutPlans = async () => {
  const res = await api.workouts.plans.$get();
  if (!res.ok) throw new Error("не можахме извлечем тренировъчните планове");
  return await res.json();
};

export const fetchCardByPlanId = async (planId: string) => {
  const res = await api.workouts.plans[":planId"].card.$get({
    param: {
      planId,
    },
  });
  if (!res.ok) {
    const data = await res.json();
    if ("msg" in data) {
      throw new Error(data.msg);
    }
    throw new Error("незнайна грешка");
  }
  return await res.json();
};

export const deleteWorkoutPlan = async (planId: string) => {
  const res = await api.workouts.plans[":id"].$delete({
    param: {
      id: planId,
    },
  });

  if (!res.ok) {
    const errMsg = await res.json();
    throw new Error(errMsg.msg || "грешка при триенето на плана");
  }
  return await res.json();
};

export const patchWorkoutCard = async (
  cardId: number,
  patchedCard: PatchCardType
) => {
  const res = await api.workouts.cards[":id"].$patch({
    param: {
      id: String(cardId),
    },
    json: patchedCard,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.msg);
  }
  return await res.json();
};

//  QueryOptions
export const getWorkoutCardsQueryOptions = queryOptions({
  queryKey: ["fetch-workout-cards"],
  queryFn: fetchWorkoutCards,
  staleTime: 5 * 1000 * 60,
});

export const listUserAccountsQueryOptions = queryOptions({
  queryKey: ["list-user-accounts"],
  queryFn: fetchUserAccountList,
  staleTime: 5 * 1000 * 60,
});

export const getUserSubscriptionsQueryOptions = queryOptions({
  queryKey: ["get-subscriptions"],
  queryFn: fetchUserActiveSubscriptions,
  staleTime: 5 * 1000 * 60,
});

export const getUserWorkoutPlanQueryOptions = (workoutPlanId: string) =>
  queryOptions({
    queryKey: ["get-user-workout", workoutPlanId],
    queryFn: () => fetchUserWorkout(workoutPlanId),
    staleTime: 5 * 1000 * 60,
  });

export const getAuthDataQueryOptions = queryOptions({
  queryKey: ["get-auth-data"],
  queryFn: fetchAuthData,
  staleTime: 5 * 1000 * 60,
});

export const listUsersQueryOptions = queryOptions({
  queryKey: ["list-all-users"],
  queryFn: listAllUsers,
  staleTime: 5 * 1000 * 60,
});

export const getAllWorkoutPlansQueryOptions = queryOptions({
  queryKey: ["fetch_all_workout_plans"],
  queryFn: fetchAllWorkoutPlans,
  staleTime: 5 * 1000 * 60,
});

export const getCardInfoQueryOptions = (planId: number) =>
  queryOptions({
    queryKey: ["fetch_card_by_plan_id", planId],
    queryFn: () => fetchCardByPlanId(String(planId)),
  });
