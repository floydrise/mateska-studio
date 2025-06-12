import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import studioLogo from "/Logo-2.webp";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const { data } = authClient.useSession();
  return (
    <header className="p-2 border bg-slate-100 dark:bg-slate-200 text-black sticky top-0">
      <nav className="flex flex-row justify-between items-center gap-2 w-full px-2">
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          src={studioLogo}
          alt="App logo"
          className="size-20"
        />
        <div className="flex gap-6">
          <Link
            to="/"
            className={`[&.active]:scale-110 [&.active]:font-bold [&.active]:text-xl  font-light transform duration-500 hover:scale-110 hover:font-base text-lg`}
          >
            Начало
          </Link>
          <Link
            to="/workouts"
            className={`[&.active]:scale-110 [&.active]:font-bold [&.active]:text-xl font-light transform duration-500 hover:scale-110 hover:font-base text-lg`}
          >
            Продукти
          </Link>
        </div>
        <div className="flex gap-4">
          {data?.session ? (
            <Link to="/profile" className={`[&.active]:font-bold`}>
              <Button
                size={"icon"}
                className="rounded-full border text-black border-slate-300 bg-slate-100 transition duration-500 scale-105 hover:scale-100 hover:text-white"
              >
                <User />
              </Button>
            </Link>
          ) : (
            <Button asChild>
              <Link to="/login">Влез</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
