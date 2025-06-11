import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { FaGoogle } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client.ts";
import { Heart, Send } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/LoginForm";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleForgoten, setToggleForgoten] = useState(false);
  return (
    <section className={"m-auto px-2 max-w-sm md:max-w-md mt-40"}>
      <Card>
        <CardHeader>
          <CardTitle
            className={"text-xl justify-center items-center flex gap-1"}
          >
            Влез в профила си
          </CardTitle>
          <CardDescription className={"m-auto flex gap-1 items-center"}>
            С имейл и парола
          </CardDescription>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <div className="flex flex-col gap-1">
            {toggleForgoten ? <ResetPasswordForm /> : <LoginForm />}
            <div className="flex justify-between">
              <Link to="/register" className="hover:underline">
                Регистрирай се
              </Link>
              <p
                onClick={() => setToggleForgoten(!toggleForgoten)}
                className="hover:cursor-pointer hover:underline"
              >
                Забравена парола?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">или</span>
            <Separator className="flex-1" />
          </div>
          <Button
            disabled={isLoading}
            variant={"outline"}
            className="transition duration-500 hover:scale-105"
            onClick={async () => {
              setIsLoading(true);
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "http://localhost:5173/",
              });
            }}
          >
            <FaGoogle className={"size-6"} /> Влез с Google акаунт
          </Button>
        </CardContent>
        <CardFooter>
          <p
            className={
              "italic font-light m-auto inline-flex items-center gap-2"
            }
          >
            Благодарим, че избрахте нас! <Heart className="size-4" />
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
