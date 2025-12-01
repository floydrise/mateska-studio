import { Calendar, LogOut, Mail, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { authClient } from "@/lib/auth-client";
import { format } from "date-fns/format";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import type { Dispatch, SetStateAction } from "react";
import type { UseNavigateResult } from "@tanstack/react-router";

export const UserInfoSection = ({
  user,
  hasPassword,
  password,
  setPassword,
  navigate,
}: {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    banned: boolean | null | undefined;
    role?: string | null | undefined;
    banReason?: string | null | undefined;
    banExpires?: Date | null | undefined;
  };
  hasPassword: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  navigate: UseNavigateResult<string>;
}) => {
  return (
    <Card className="shadow-md border rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Вашата лична информация
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-muted-foreground">
        <p className="flex items-center text-xl gap-2">
          <User className="w-5 h-5" /> Име: {user?.name}
        </p>

        <p className="flex items-center text-xl gap-2">
          <Mail className="w-5 h-5" /> Email: {user?.email}
        </p>

        <p className="flex items-center text-xl gap-2">
          <Calendar className="w-5 h-5" />
          Регистриран на: {format(user?.createdAt!, "dd/MM/yyyy")}
        </p>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: { onSuccess: () => navigate({ to: "/" }) },
              })
            }
            variant="outline"
            className="flex-1 transition duration-300 hover:scale-105 text-foreground"
          >
            <LogOut /> Излез
          </Button>

          <DeleteAccountDialog
            hasPassword={hasPassword}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </CardContent>
    </Card>
  );
};
