import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllWorkoutPlansQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  Home,
  Loader,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditWorkoutNav() {
  const [isOpen, setIsOpen] = useState(true);
  const { data, error, isError, isLoading } = useQuery(
    getAllWorkoutPlansQueryOptions
  );

  if (isError) toast.error(error.message);
  console.log(data);
  return (
    <div className="flex h-screen w-full">
      <aside
        className={`${
          isOpen ? "w-40" : "w-14"
        } flex flex-col border rounded-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b m-auto">
          <span
            className={`${isOpen ? "block" : "hidden"} text-lg font-semibold`}
          >
            Планове
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
              <Home className="mr-2 h-4 w-4" />
              {isOpen && "Home"}
            </Button>
            {isOpen ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    {isOpen && (
                      <>
                        Products
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 1
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 2
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 3
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button variant="ghost">
                <Package className="mr-2 h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              {isOpen && "Users"}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              {isOpen && "Settings"}
            </Button>
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <h1 className="text-2xl font-bold">Избери план от листа вляво</h1>
        )}
      </main>
    </div>
  );
}
