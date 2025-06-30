import { listUsersQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Bird, Trash } from "lucide-react";
import type { UserWithRole } from "better-auth/plugins/admin";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface ExtendedUserWithRole extends UserWithRole {
  stripeCustomerId?: string | undefined;
}

const tableHeads = [
  "Име",
  "Имейл",
  "Stripe ID",
  "Роля",
  "Създаден на",
  "Баннат",
  "Ban/Unban",
  "Изтрий",
];

export const ListUsers = () => {
  const { data, isLoading, isError, error } = useQuery(listUsersQueryOptions);
  const users: ExtendedUserWithRole[] | undefined = data?.users;
  if (isError) {
    toast.error("Възникна грешка: " + error.message);
  }
  if (isLoading) {
    return <Skeleton className="w-full h-80 rounded-2xl" />;
  }
  return (
    <Table>
      <TableCaption>Лист с всички потребители</TableCaption>
      <TableHeader className="bg-accent rounded-4xl">
        <TableRow>
          {tableHeads.map((head, index) => (
            <TableHead key={head + index} className="font-semibold">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.stripeCustomerId}</TableCell>
            <TableCell>
              <Badge
                variant={user.role === "admin" ? "destructive" : "default"}
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>{format(user.createdAt, "dd/MM/yyyy")}</TableCell>
            <TableCell>{user.banned ? "Да" : "Не"}</TableCell>
            <TableCell>
              {user.banned ? (
                <Button
                  variant={"outline"}
                  onClick={async () => {
                    const { data, error } = await authClient.admin.unbanUser({
                      userId: user.id,
                    });
                    if (data) {
                      toast.success("Успешно освободи: " + data.user.name);
                    }
                    if (error) toast.error("Възникна грешка: " + error.message);
                  }}
                >
                  <Bird />
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  onClick={async () => {
                    const { data, error } = await authClient.admin.banUser({
                      userId: user.id,
                    });
                    if (data) toast.success("Успешно банна: " + data.user.name);
                    if (error) toast.error("Възникна грешка: " + error.message);
                  }}
                >
                  <Ban />
                </Button>
              )}
            </TableCell>
            <TableCell>
              <Button
                variant={"outline"}
                onClick={async () => {
                  const { data, error } = await authClient.admin.removeUser({
                    userId: user.id,
                  });
                  if (data?.success)
                    toast.success("Успешно изтри потребител: " + user.name);
                  if (error) toast.error("Възникна грешка: " + error.message);
                }}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
