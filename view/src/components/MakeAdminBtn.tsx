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
import { Badge } from "./ui/badge";
import { Rocket, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const MakeAdminBtn = ({
  userInfo,
}: {
  userInfo: { role: string | undefined; id: string };
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userInfo: { role: string | undefined; id: string }) => {
      const { error } = await authClient.admin.setRole({
        userId: userInfo.id,
        role: userInfo.role === "admin" ? "user" : "admin",
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-all-users"] });
      toast.success("Успешно смени ролята на потребителя");
    },
    onError: (error) => {
      toast.error("Възникна грешка: " + error.message);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Badge variant={userInfo.role === "admin" ? "destructive" : "default"}>
          {userInfo.role}
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Искаш ли да направиш този потребител "
            {userInfo.role === "admin" ? "user" : "admin"}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Това е обратимо, ако искаш да смениш между "админ" и "потребител",
            просто кликни ролята отново и натисни "Да"
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-all transform-3d hover:-rotate-10">
            <X /> Не
          </AlertDialogCancel>
          <AlertDialogAction
            className="transition-all transform-3d hover:rotate-10"
            onClick={() => {
              mutation.mutate(userInfo);
            }}
          >
            <Rocket /> Да
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
