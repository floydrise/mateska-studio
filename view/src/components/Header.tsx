import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import studioLogo from "/Logo-2.webp";

export default function Header() {
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
        <ModeToggle />
      </nav>
    </header>
  );
}
