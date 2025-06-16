import { createFileRoute, Link } from "@tanstack/react-router";
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
    <section className={"m-auto px-2 w-sm max-w-sm md:min-w-md my-20"}>
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
          <div>
            <p>
              Имаш акаунт?{" "}
              <Link to="/login" className="underline">
                Влез
              </Link>
            </p>
            <p
              className={
                "text-sm italic font-light m-auto inline-flex items-center gap-1"
              }
            >
              Добре дошли в екипа на MateskaSport! <Heart className="size-3" />
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
