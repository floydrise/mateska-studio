import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkoutPlan } from "./api";
import { toast } from "sonner";

export const deletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId: string) => deleteWorkoutPlan(planId),
    onError: (error) => {
      toast.error("Изникна грешка: " + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_all_workout_plans"] });
      toast.success("Успешно изтрихте плана");
    },
  });
};
