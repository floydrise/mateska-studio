import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Book,
  Compass,
  House,
  LogIn,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Store,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function MobileNav() {
  const navigate = useNavigate();
  const { data } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { hash, pathname } = useLocation();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={"mx-2 focus:outline-none"}>
        <Menu />
      </SheetTrigger>
      <SheetContent className={""}>
        <SheetHeader>
          <SheetTitle className="flex gap-2 items-center">
            <Compass />
            Mеню
          </SheetTitle>
        </SheetHeader>
        <div className={"flex flex-col justify-between h-full"}>
          <div>
            <div
              className={`flex gap-1 py-3 border-t border-b ${hash == "top" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/", hash: "top" });
              }}
            >
              <House className={"ml-2"} />{" "}
              <p className={"font-semibold"}>Начало</p>
            </div>
            <div
              className={`flex gap-1 py-3 border-b ${hash == "products" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/", hash: "products" });
              }}
            >
              <Store className={"ml-2"} />{" "}
              <p className={"font-semibold"}>Продукти</p>
            </div>
            <div
              className={`flex gap-1 py-3 border-b ${hash == "howTo" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/", hash: "howTo" });
              }}
            >
              <Book className={"ml-2"} />{" "}
              <p className={"font-semibold"}>Как се ползва?</p>
            </div>
            <div
              className={`flex gap-1 py-3 border-b ${hash == "faq" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/", hash: "faq" });
              }}
            >
              <MessageCircleQuestion className={"ml-2"} />{" "}
              <p className={"font-semibold"}>FAQ</p>
            </div>
          </div>
          <div>
            {data?.user ? (
              <>
                <div
                  className={`flex gap-1 py-3 border-b ${pathname == "/profile" ? "bg-primary-foreground" : null}`}
                  onClick={async () => {
                    setIsOpen(false);
                    await navigate({ to: "/profile" });
                  }}
                >
                  <User className={"ml-2"} />{" "}
                  <p className={"font-semibold"}>Профил</p>
                </div>
                <div
                  className={"flex gap-1 py-3"}
                  onClick={async () => {
                    setIsOpen(false);
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          navigate({ to: "/" });
                        },
                      },
                    });
                  }}
                >
                  <LogOut className={"ml-2"} />{" "}
                  <p className={"font-semibold"}>Излез</p>
                </div>
              </>
            ) : (
              <div
                className={`flex gap-1 py-3 border-t ${pathname == "/login" ? "bg-primary-foreground" : null}`}
                onClick={async () => {
                  setIsOpen(false);
                  await navigate({ to: "/login" });
                }}
              >
                <LogIn className={"ml-2"} />{" "}
                <p className={"font-semibold"}>Влез</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
