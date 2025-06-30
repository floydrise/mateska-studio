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
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DeleteUserButton = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.removeUser({
        userId: userId,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-all-users"] });
      toast.success("Успешно изтри потребителя");
    },
    onError: (error) => {
      toast.error("Възникна грешка: " + error.message);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Напълно сигурна ли си?</AlertDialogTitle>
          <AlertDialogDescription>
            Тази акция не може да бъде отменена! Това изцяло ще изтрие
            информацията за този потребител от базата ни с данни и НЯМА как да я
            върнем.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмени</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutation.mutate(userId);
            }}
          >
            Изтрий
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
