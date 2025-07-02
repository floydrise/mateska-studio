import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePlanMutation } from "@/lib/mutations";
import { Button } from "./ui/button";
import { Check, Trash, X } from "lucide-react";

export const DeleteWorkoutBtn = ({
  workoutPlanId,
}: {
  workoutPlanId: number;
}) => {
  const deleteMutation = deletePlanMutation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="w-full justify-start"
        >
          <Trash /> Изтрий
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Сигурна ли си, че искаш да продължиш?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Това ще изтрие плана заедно с всичката информация свързана с него -
            карти, секции и сесии. Тази акция е НЕОБРАТИМА, перманентно ще
            изтрие информацията от базата ни с данни!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X /> Отмени
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMutation.mutate(String(workoutPlanId));
            }}
          >
            <Check /> Продължи
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
