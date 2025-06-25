"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brush,
  ChevronRight,
  Cog,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } flex flex-col border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span
            className={`${isOpen ? "block" : "hidden"} text-lg font-semibold`}
          >
            Дашборд
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2">
            <Button variant="ghost" className="w-full justify-start">
              <Brush className="mr-2 h-4 w-4" />
              {isOpen && "Създай"}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Cog className="mr-2 h-4 w-4" />
              {isOpen && "Редактирай"}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              {isOpen && "Потребители"}
            </Button>
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
      </main>
    </div>
  );
}
