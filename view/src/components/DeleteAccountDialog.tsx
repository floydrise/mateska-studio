import { Eye, EyeClosed, Trash } from "lucide-react";
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
import { useState } from "react";

export const DeleteAccountDialog = ({
  hasPassword,
  password,
  setPassword,
}: {
  hasPassword: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  const [eyeIcon, setEyeIcon] = useState<boolean>(false);
  const [type, setType] = useState("password");
  const handleToggle = () => {
    if (type === "password") {
      setEyeIcon(true);
      setType("text");
    } else {
      setEyeIcon(false);
      setType("password");
    }
  };

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

          <AlertDialogDescription className="text-muted-foreground">
            Това действие <span className="underline">НЕ</span> може да бъде
            отменено. Акаунтът и данните Ви ще бъдат изтрити!
          </AlertDialogDescription>

          <div className="mt-4 font-semibold space-y-2">
            {hasPassword && (
              <>
                <Label htmlFor="password" className="text-lg">
                  Потвърдете паролата си:
                </Label>

                <div className="flex">
                  <Input
                    type={type}
                    id="password"
                    value={password}
                    placeholder="Парола"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="flex justify-around items-center hover:cursor-pointer"
                    onClick={handleToggle}
                  >
                    {eyeIcon ? (
                      <Eye className="absolute mr-10" />
                    ) : (
                      <EyeClosed className="absolute mr-10" />
                    )}
                  </span>
                </div>
              </>
            )}
            <p className="text-muted-foreground">
              Ще получите имейл с линк за потвърждение.
            </p>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setPassword("");
              setEyeIcon(false);
              setType("password");
            }}
          >
            Отмени
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={async () => {
              try {
                const { data, error } = await authClient.deleteUser({
                  password: hasPassword ? password : undefined,
                  callbackURL: import.meta.env.BASE_URL + "/goodbye",
                });

                if (error) {
                  toast.error(
                    error.message === "Invalid password"
                      ? "Невалидна парола"
                      : error.message,
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
