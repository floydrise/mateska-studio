import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Ban } from "lucide-react";
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
    <Button
      variant={"outline"}
      onClick={() => {
        mutation.mutate(userId);
      }}
    >
      <Ban />
    </Button>
  );
};
