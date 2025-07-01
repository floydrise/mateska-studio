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
import type { UserWithRole } from "better-auth/plugins/admin";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { BanUserButton } from "./BanUserButton";
import { UnbanUserButton } from "./UnbanUserButton";
import { DeleteUserButton } from "./DeleteUserButton";
import { BadgeCheck, BadgeX } from "lucide-react";

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
              <TableCell>{user.banned ? <BadgeCheck /> : <BadgeX />}</TableCell>
              <TableCell>
                {user.banned ? (
                  <UnbanUserButton userId={user.id} />
                ) : (
                  <BanUserButton userId={user.id} />
                )}
              </TableCell>
              <TableCell>
                <DeleteUserButton userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
  );
};
