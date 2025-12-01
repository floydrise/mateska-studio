import { Trash } from "lucide-react";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";

export const DeleteAccountDialog = ({
  hasPassword,
  password,
  setPassword,
}: {
  hasPassword: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex-1 transition duration-300 hover:scale-105"
        >
          <Trash /> Изтрии
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Напълно сигурен/а ли сте?</AlertDialogTitle>

          <AlertDialogDescription className="text-red-500">
            Това действие <span className="underline italic">НЕ</span> може да
            бъде отменено. Акаунтът и данните Ви ще бъдат изтрити.
          </AlertDialogDescription>

          <div className="mt-4 font-semibold space-y-2">
            {hasPassword && (
              <>
                <Label htmlFor="password" className="text-lg">
                  Потвърдете паролата си:
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Парола"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            <p>Ще получите имейл с линк за потвърждение.</p>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмени</AlertDialogCancel>

          <AlertDialogAction
            onClick={async () => {
              try {
                const { data, error } = await authClient.deleteUser({
                  password: hasPassword ? password : undefined,
                  callbackURL: "http://localhost:5173/goodbye",
                });

                if (error) {
                  toast.error(
                    error.message === "Invalid password"
                      ? "Невалидна парола"
                      : error.message
                  );
                  setPassword("");
                }

                if (data?.success) toast.success("Проверете пощата си");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Продължи
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
