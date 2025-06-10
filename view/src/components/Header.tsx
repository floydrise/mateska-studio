import { Link, useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import studioLogo from "/Logo-2.webp";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const navigate = useNavigate();
  const { data } = authClient.useSession();
  return (
    <header className="p-2 border flex gap-2 justify-between bg-white text-black">
      <nav className="flex flex-row items-center gap-2">
        <img src={studioLogo} alt="App logo" className="size-20" />
        <Link to="/" className={`[&.active]:font-bold `}>
          Начало
        </Link>
        <Link to="/workouts" className={`[&.active]:font-bold`}>
          Тренировки
        </Link>
        {data?.session ? (
          <Button
            onClick={async () =>
              authClient.signOut({
                fetchOptions: { onSuccess: () => navigate({ to: "/" }) },
              })
            }
          >
            Излез
          </Button>
        ) : (
          <Button asChild>
            <Link to="/login">Влез</Link>
          </Button>
        )}
        <ModeToggle />
      </nav>
    </header>
  );
}
