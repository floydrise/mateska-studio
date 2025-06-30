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
import { Ban, Check, Trash, X } from "lucide-react";
import type { UserWithRole } from "better-auth/plugins/admin";
import { format } from "date-fns";

interface ExtendedUserWithRole extends UserWithRole {
  stripeCustomerId?: string | undefined;
}

const tableHeads = [
  "Име",
  "Имейл",
  "Stripe ID",
  "Създаден на",
  "Баннат",
  "Банни",
  "Изтрий",
];

export const ListUsers = () => {
  const { data } = useQuery(listUsersQueryOptions);
  const users: ExtendedUserWithRole[] | undefined = data?.users;
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
            <TableCell>{format(user.createdAt, "dd/MM/yyyy")}</TableCell>
            <TableCell>{user.banned ? "Да" : "Не"}</TableCell>
            <TableCell>
              <Ban />
            </TableCell>
            <TableCell>
              <Trash />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
