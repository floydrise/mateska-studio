import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Zap,
  CalendarCheck,
  CalendarX,
  OctagonX,
  Dumbbell,
  Ban,
  ChevronDown,
} from "lucide-react";
import type { Subscription } from "@better-auth/stripe";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function SubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  return (
    <Card className="w-full max-w-md shadow-lg rounded-xl">
      <CardContent className="pt-6 px-6">
        <div
          onClick={() => setShow(!show)}
          className="flex justify-between items-center mb-4 gap-2 hover:cursor-pointer"
        >
          <div className="flex items-center gap-1 ">
            <ChevronDown
              className={`${show ? "transition duration-500 rotate-180" : "transition duration-500 rotate-0"}`}
            />
            <span className="text-xl md:text-2xl font-bold">
              {subscription.plan[0].toUpperCase() + subscription.plan.slice(1)}
            </span>
          </div>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-100 px-4 py-1 rounded-full"
          >
            {subscription.status}
          </Badge>
        </div>

        {show && (
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Zap className="h-5 w-5 text-gray-500" />
                <span className="text-lg">Статус</span>
              </div>
              <span className="font-semibold text-lg">активен</span>
            </div>

            <div className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <RefreshCw className="h-5 w-5 text-gray-500" />
                <span className="text-lg">Автоматично обновяване</span>
              </div>
              <span className="font-semibold text-lg">Да</span>
            </div>

            <div className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <CalendarCheck className="h-5 w-5 text-gray-500" />
                <span className="text-lg">Начална дата</span>
              </div>
              <span className="font-semibold text-lg">
                {subscription.periodStart &&
                  format(subscription.periodStart, "dd/MM/yyyy")}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <CalendarX className="h-5 w-5 text-gray-500" />
                <span className="text-lg">Крайна дата</span>
              </div>
              <span className="font-semibold text-lg">
                {subscription.periodEnd &&
                  format(subscription.periodEnd, "dd/MM/yyyy")}
              </span>
            </div>
            {subscription.cancelAtPeriodEnd ? (
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                  <Ban className="h-5 w-5 text-gray-500" />
                  <span className="text-lg">Отменен абонамент</span>
                </div>
                <span className="font-semibold text-lg">Да</span>
              </div>
            ) : null}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between gap-2">
        {subscription.cancelAtPeriodEnd ? (
          <Button
            onClick={async () => {
              const { error } = await authClient.subscription.restore();
              if (error) {
                toast.error("Възникна грешка: " + error.message);
              } else {
                toast.success("Успешно възстановихте абонамента си");
                queryClient.invalidateQueries({
                  queryKey: ["get-subscriptions"],
                });
              }
            }}
            className="text-xl flex-1 transition duration-500 hover:scale-105 hover:-translate-y-1 hover:-translate-x-1"
          >
            <CalendarCheck className="size-5" /> Възстанови
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const { error } = await authClient.subscription.cancel({
                returnUrl: "/",
              });
              if (error) {
                toast.error("Изникна грешка: " + error.message);
              }
              queryClient.invalidateQueries({
                queryKey: ["get-subscriptions"],
              });
            }}
            variant={"destructive"}
            className="text-xl flex-1 transition duration-500 hover:scale-105 hover:-translate-y-1 hover:-translate-x-1"
          >
            <OctagonX className="size-5" /> Прекъсни
          </Button>
        )}
        <Button
          variant={"outline"}
          className="text-xl flex-1 transition duration-500 hover:scale-105 hover:-translate-y-1 hover:translate-x-1"
          asChild
        >
          <Link
            to={"/workout/$workoutId"}
            params={{ workoutId: String(subscription.limits?.workoutPlanId) }}
          >
            <Dumbbell className="size-5" /> Тренирай
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
