import { Link } from "@tanstack/react-router";
import studioLogoLight from "/logoLight.webp";
import studioLogoDark from "/logoDark.webp";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { Home, Store, User } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
export default function Header() {
  const { data } = authClient.useSession();
  const { resolvedTheme } = useTheme();
  return (
    <header className="p-2 border sticky top-0 bg-background z-10">
      <nav className="flex flex-row justify-between items-center gap-2 w-full px-2">
        <Link to="/">
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            src={resolvedTheme === "dark" ? studioLogoDark : studioLogoLight}
            alt="App logo"
            className="size-20"
          />
        </Link>
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
            <Link to="/profile" className={`[&.active]:font-bold`}>
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
              <Link to="/login">Влез</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
