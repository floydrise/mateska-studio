import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="p-2 border flex gap-2 justify-between">
      <nav className="flex flex-row items-center gap-2">
        <Link to="/">Начало</Link>
        <Link to="/workouts">Тренировки</Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
