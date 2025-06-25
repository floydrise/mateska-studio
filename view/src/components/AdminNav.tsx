import { Button } from "@/components/ui/button";
import { Brush, Eraser, Users } from "lucide-react";

export default function AdminNav() {
  return (
    // add fixed  to the nav class name to make the navbar stick to the bottom of the screen
    <div className=" bottom-6 left-0 right-0 flex justify-center">
      <nav className="flex items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Brush className="h-5 w-5" />
          <span className="sr-only">Създай</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Users className="h-5 w-5" />
          <span className="sr-only">Потребители</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Eraser className="h-5 w-5" />
          <span className="sr-only">Редактирай</span>
        </Button>
      </nav>
    </div>
  );
}
