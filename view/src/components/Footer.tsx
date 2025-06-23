import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { Monitor, MoonStar, Send, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  FaFacebookF,
  FaInstagram,
  FaThreads,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const { setTheme, theme } = useTheme();
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Бюлетин</h2>
            <p className="mb-6 text-muted-foreground">
              Абонирайте се за нашия бюлетин за най-новите актуализации и
              ексклузивни оферти.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Напишете имейлът си"
                className="pr-12 backdrop-blur-sm rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Абонирай се</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Бързи линкове</h3>
            <nav className="space-y-2 text-sm">
              <Link
                to="/"
                className="block transition-colors hover:text-primary"
              >
                Начало
              </Link>
              <a
                href="https://mateskasport.com/"
                target="_blank"
                className="block transition-colors hover:text-primary"
              >
                За мен
              </a>
              <Link
                to="/"
                hash="products"
                className="block transition-colors hover:text-primary"
              >
                Продукти
              </Link>
              <Link
                to="/"
                hash="howTo"
                className="block transition-colors hover:text-primary"
              >
                Как се ползва?
              </Link>
              <Link
                to="/"
                hash="faq"
                className="block transition-colors hover:text-primary"
              >
                Често задавани въпроси
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Свържете се</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>к-с "Славейков"</p>
              <p>Бургас, 8000</p>
              <p>Телефон: (123) 456-7890</p>
              <p>Имейл: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Последвайте ни</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href="https://www.facebook.com/aleksandra.mateska.35/"
                        target="_blank"
                      >
                        <FaFacebookF className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Последвайте ни във Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href="https://www.threads.com/@mateska_fitmama?xmt=AQF0eUxtYZfjDmCXYIwvY76h61krySeYalwAAPW2C_D0d5Y"
                        target="_blank"
                      >
                        <FaThreads className="h-4 w-4" />
                        <span className="sr-only">Threads</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Последвайте ни в Threads</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href="https://www.instagram.com/mateska_fitmama/"
                        target="_blank"
                      >
                        <FaInstagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Последвайте ни в Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href="https://www.youtube.com/@mateskasport"
                        target="_blank"
                      >
                        <FaYoutube className="h-4 w-4" />
                        <span className="sr-only">YouTube</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Абонирайте се в YouTube</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Тема</h3>
            <div className="flex border w-fit gap-2 rounded-full">
              <span className="sr-only">Toggle theme</span>
              <Button
                size={"icon"}
                variant={"ghost"}
                className={`rounded-full ${theme === "light" && "bg-accent"}`}
                onClick={() => setTheme("light")}
              >
                <Sun />
              </Button>
              <Button
                size={"icon"}
                variant={"ghost"}
                className={`rounded-full ${theme === "dark" && "bg-accent"}`}
                onClick={() => setTheme("dark")}
              >
                <MoonStar />
              </Button>
              <Button
                size={"icon"}
                variant={"ghost"}
                className={`rounded-full ${theme === "system" && "bg-accent"}`}
                onClick={() => setTheme("system")}
              >
                <Monitor />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-4 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 MateskaSport Studio. Всички права запазени.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              to="/privacy_policy"
              className="transition-colors hover:text-primary"
            >
              Политика за поверителност
            </Link>
            <Link
              to="/terms_of_use"
              className="transition-colors hover:text-primary"
            >
              Условия за ползване
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
