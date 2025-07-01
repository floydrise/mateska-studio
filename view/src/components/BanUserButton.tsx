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
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Ban, Rocket, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const BanUserButton = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await authClient.admin.banUser({
        userId: userId,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["list-all-users"] });
      toast.success("Успешно банна: " + data?.user.name);
    },
    onError: (error) => {
      toast.error("Възникна грешка: " + error.message);
    },
  });
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>
            <Ban />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Наистина ли искаш да баннеш този потребител?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Това е обратимо, ако искаш да "освободиш" потребителя, просто
              кликни бутона отново.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X /> Отмени
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(userId);
              }}
            >
              <Rocket /> Банни
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
