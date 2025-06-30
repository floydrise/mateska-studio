import { Button } from "@/components/ui/button";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Brush, Eraser, Users } from "lucide-react";

const routeApi = getRouteApi("/admin");

export default function AdminNav() {
  const { action } = routeApi.useSearch();
  return (
    // add fixed  to the nav class name to make the navbar stick to the bottom of the screen
    <div className=" bottom-6 left-0 right-0 flex justify-center">
      <nav className="flex items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg">
        <Link to="/admin" search={{ action: "create" }}>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${action === "create" && "bg-accent dark:bg-primary-foreground"}`}
          >
            <Brush className="h-5 w-5" />
            <span className="sr-only">Създай</span>
          </Button>
        </Link>
        <Link to="/admin" search={{ action: "list_users" }}>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${action === "list_users" && "bg-accent dark:bg-primary-foreground"}`}
          >
            <Users className="h-5 w-5" />
            <span className="sr-only">Потребители</span>
          </Button>
        </Link>
        <Link to="/admin" search={{ action: "edit" }}>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${action === "edit" && "bg-accent dark:bg-primary-foreground"}`}
          >
            <Eraser className="h-5 w-5" />
            <span className="sr-only">Редактирай</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
}
