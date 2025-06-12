import type { WorkoutCardType } from "../../../shared/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dumbbell, ShoppingCart, Target } from "lucide-react";
import imgPlaceholder from "/imgPlaceholder.svg";
import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserSubscriptionsQueryOptions } from "@/lib/api";

const WorkoutCard = ({ workoutCard }: { workoutCard: WorkoutCardType }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const navigate = useNavigate();
  const { data: subData } = useQuery(getUserSubscriptionsQueryOptions);
  const {
    workoutCardTitle,
    workoutCardImgUrl,
    workoutCardPrice,
    workoutCardTargetMuscles,
    workoutCardEquipment,
  } = workoutCard;
  return (
    <Card className="group overflow-hidden w-full max-w-sm transition-all pt-0">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={workoutCardImgUrl || imgPlaceholder}
          alt={workoutCardTitle}
          className="h-full w-full  object-cover transition-transform duration-1000 group-hover:scale-115"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{workoutCardTitle}</h3>
          <div className="text-lg font-semibold text-green-600">
            {workoutCardPrice.toFixed(2)} лв
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Мускулни групи</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {workoutCardTargetMuscles.map((muscle, index) => (
              <Badge key={index} variant="secondary">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Оборудване</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {workoutCardEquipment.map((equipment, index) => (
              <Badge key={index} variant="outline">
                {equipment}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size={"lg"}
          className={"w-full text-lg transform duration-500 hover:scale-105"}
          onClick={async () => {
            if (!user) {
              navigate({ to: "/login" });
            } else {
              try {
                const { error } = await authClient.subscription.upgrade({
                  plan: workoutCardTitle,
                  successUrl: "http://localhost:5173/profile",
                  cancelUrl: "http://localhost:5173",
                  subscriptionId: subData?.stripeSubscriptionId || undefined,
                });
                if (error) toast.error("Изникна грешка: " + error.message);
              } catch (error) {
                console.log(error);
              }
            }
          }}
        >
          <ShoppingCart className={"size-5"} /> Абонирай ме
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
