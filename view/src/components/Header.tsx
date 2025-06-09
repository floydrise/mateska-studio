import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import studioLogo from "../../public/mateska_logo.webp";

export default function Header() {
  return (
    <header className="p-2 border flex gap-2 justify-between">
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
