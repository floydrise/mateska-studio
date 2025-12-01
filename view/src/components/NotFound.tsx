import { Home } from "lucide-react";
import { Button } from "./ui/button";
import notFoundImg from "/notFound.webp?url";
import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 my-10 items-center justify-center">
      <img
        src={notFoundImg}
        alt="Картинка, която показва, че страницата не е открита"
        className="size-140 object-contain"
      />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        Страницата не беше открита
      </h1>
      <Button asChild>
        <Link to="/">
          <Home /> Към начало
        </Link>
      </Button>
    </div>
  );
};
