import { Link } from "@tanstack/react-router";
import { Home, LogIn, Store, User } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export const DesktopNav = () => {
  const { data } = authClient.useSession();
  return (
    <>
      <div className="flex gap-6">
        <Link
          to="/"
          className={`[&.active]:scale-110 [&.active]:font-extrabold [&.active]:text-xl flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base text-lg`}
        >
          <Home /> Начало
        </Link>
        <Link
          to="/workouts"
          className={`[&.active]:scale-110 [&.active]:font-extrabold [&.active]:text-xl flex items-center gap-1  transform duration-500 hover:scale-110 hover:font-base text-lg`}
        >
          <Store /> Продукти
        </Link>
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
          <Button asChild>
            <Link to="/login">
              <LogIn /> Влез
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
