import SubscriptionCard from "@/components/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAuthDataQueryOptions,
  getUserSubscriptionsQueryOptions,
  listUserAccountsQueryOptions,
} from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Subscription } from "@better-auth/stripe";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { format } from "date-fns";
import { Calendar, LogOut, Mail, Trash, User } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    const data = await context.queryClient.ensureQueryData(
      getAuthDataQueryOptions
    );
    if (!data?.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Потребителски профил - лична данни и абонаменти",
      },
      {
        title: "Profile • Mateska Studio",
      },
    ],
  }),
});

function RouteComponent() {
  const [password, setPassword] = useState("");
  const { data: authData, isPending } = authClient.useSession();
  const { data: accountsList } = useQuery(listUserAccountsQueryOptions);
  let hasPassword = accountsList?.find((acc) => acc.provider === "credential");
  const user = authData?.user;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery(
    getUserSubscriptionsQueryOptions
  );
  if (isError) console.log("Изинка грешка: " + error.message);
  return (
    <section className="mt-10 flex flex-col justify-center items-center w-full">
      <div>
        <div className="max-w-fit">
          <h1 className="text-2xl md:text-4xl font-bold">Данни:</h1>
          {isPending ? (
            <Skeleton className="h-40 w-80" />
          ) : (
            <div className="mt-2">
              <p className="flex items-center text-xl gap-1 text-muted-foreground">
                <User /> Име: {user?.name}
              </p>
              <p className="flex items-center text-xl gap-1 text-muted-foreground">
                <Mail /> Email: {user?.email}
              </p>
              <p className="flex items-center text-xl gap-1 text-muted-foreground">
                <Calendar /> Регистриран на:{" "}
                {format(user?.createdAt!, "dd/MM/yyyy")}
              </p>
              <div className="w-full flex justify-between gap-2 mt-2">
                <Button
                  onClick={async () =>
                    authClient.signOut({
                      fetchOptions: { onSuccess: () => navigate({ to: "/" }) },
                    })
                  }
                  variant={"outline"}
                  className="flex-1 transition duration-300 hover:scale-105"
                >
                  <LogOut /> Излез
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    className="transition duration-300 hover:scale-105"
                  >
                    <Button variant={"destructive"}>
                      <Trash /> Изтрии
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Напълно сигурен/а ли сте?
                      </AlertDialogTitle>
                      <AlertDialogDescription className={"text-red-500"}>
                        Това действие{" "}
                        <span className={"underline italic"}>НЕ</span> може да
                        бъде отменено. Това ще изтрие акаунтът Ви и ще изтрие
                        всички данни от сървърите ни.
                      </AlertDialogDescription>
                      <br />
                      <AlertDialogDescription className={"font-semibold"}>
                        {hasPassword ? (
                          <>
                            <Label htmlFor="password" className="text-lg">
                              Потвърдете паролата си:
                            </Label>
                            <Input
                              type="text"
                              id="password"
                              placeholder="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <span>
                              Ще ви бъде изпратен линк, моля кликнете го и
                              акаунтът ви ще бъде изтрит
                            </span>
                          </>
                        ) : (
                          <span>
                            Ще ви бъде изпратен линк, моля кликнете го и
                            акаунтът ви ще бъде изтрит
                          </span>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмени</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          if (hasPassword) {
                            try {
                              const { error, data } =
                                await authClient.deleteUser({
                                  password: password,
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
                              if (data?.success)
                                toast.success("Проверете пощата си");
                            } catch (error) {
                              console.log(error);
                            }
                          } else {
                            const { data, error } = await authClient.deleteUser(
                              {
                                callbackURL: "http://localhost:5173/goodbye",
                              }
                            );
                            if (error) toast.error(error.message);
                            if (data?.success)
                              toast.success("Проверете пощата си");
                          }
                          // navigate({ to: "/goodbye" });
                        }}
                      >
                        Продължи
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
        <div className="my-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Абонамент:</h1>
          {isLoading ? (
            <Skeleton className="h-48 w-90" />
          ) : data ? (
            <SubscriptionCard subscription={data as Subscription} />
          ) : (
            <span className="text-muted-foreground">
              Все още нямате абонаменти. Вземи от{" "}
              <Link to="/" className="underline">
                тук
              </Link>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
