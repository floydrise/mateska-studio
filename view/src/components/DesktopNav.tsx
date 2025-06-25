import { Link, useLocation } from "@tanstack/react-router";
import {
  Book,
  Home,
  LogIn,
  MessageCircleQuestion,
  ShieldUser,
  Store,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export const DesktopNav = () => {
  const { data } = authClient.useSession();
  const { hash, pathname } = useLocation();
  return (
    <>
      <div className="flex gap-6">
        <Link
          to="/"
          hash="top"
          className={`${hash === "top" && "scale-110 font-extrabold text-xl -translate-y-1"} flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base hover:-translate-y-1 text-lg`}
        >
          <Home /> Начало
        </Link>
        <Link
          to="/"
          hash="products"
          className={`${hash === "products" && "scale-110 font-extrabold text-xl -translate-y-1"} flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base hover:-translate-y-1 text-lg`}
        >
          <Store /> Продукти
        </Link>
        <Link
          to="/"
          hash="howTo"
          className={`${hash === "howTo" && "scale-110 font-extrabold text-xl -translate-y-1"} flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base hover:-translate-y-1 text-lg`}
        >
          <Book /> Как се ползва?
        </Link>
        <Link
          to="/"
          hash="faq"
          className={`${hash === "faq" && "scale-110 font-extrabold text-xl -translate-y-1"} flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base hover:-translate-y-1 text-lg`}
        >
          <MessageCircleQuestion /> FAQ
        </Link>
        {data?.user.role === "admin" ? (
          <Link
            to="/admin"
            className={`${pathname === "/admin" && "scale-110 font-extrabold text-xl -translate-y-1"} flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base hover:-translate-y-1 text-lg`}
          >
            <ShieldUser /> Админ
          </Link>
        ) : null}
      </div>
      <div className="flex gap-4">
        {data?.session ? (
          <Link to="/profile">
            <Button
              size={"icon"}
              variant={"outline"}
              className="rounded-full transition duration-500 scale-110 hover:scale-100"
            >
              <User />
            </Button>
          </Link>
        ) : (
          <Button asChild className="transform duration-500 hover:scale-105">
            <Link to="/login">
              <LogIn /> Влез
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
