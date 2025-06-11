import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { RegisterForm } from "@/components/RegisterForm";
export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className={"m-auto px-2 max-w-sm md:max-w-md mt-40"}>
      <Card>
        <CardHeader>
          <CardTitle
            className={"text-xl justify-center items-center flex gap-1"}
          >
            Регистрация
          </CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p
            className={
              "text-sm italic font-light m-auto inline-flex items-center gap-1"
            }
          >
            Добре дошли в екипа на MateskaSport! <Heart className="size-3" />
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
