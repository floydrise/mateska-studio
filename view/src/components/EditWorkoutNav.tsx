import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchCardByPlanId, getAllWorkoutPlansQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  FolderKanban,
  LayoutList,
  Loader,
  Menu,
  Shapes,
  Video,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteWorkoutBtn } from "./DeleteWorkoutBtn";

export default function EditWorkoutNav() {
  const [isOpen, setIsOpen] = useState(true);
  const { data, error, isError, isLoading } = useQuery(
    getAllWorkoutPlansQueryOptions
  );

  if (isError) toast.error(error.message);

  const handleCardBtnClick = async (planId: string) => {
    const data = await fetchCardByPlanId(planId);
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full">
      <aside
        className={`${
          isOpen ? "w-48" : "w-14"
        } flex flex-col border rounded-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b px-2">
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
            {isOpen ? (
              isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                data?.plans.map((plan) => (
                  <Collapsible key={plan.workoutPlanId}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Shapes className="mr-2 h-4 w-4" />
                            {isOpen && (
                              <>
                                {plan.workoutPlanTitle.length > 10
                                  ? plan.workoutPlanTitle.slice(0, 10) + "..."
                                  : plan.workoutPlanTitle}
                                <ChevronRight className="ml-auto h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{plan.workoutPlanTitle}</p>
                      </TooltipContent>
                    </Tooltip>

                    <CollapsibleContent className="ml-4 space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() =>
                          handleCardBtnClick(String(plan.workoutPlanId))
                        }
                      >
                        <FolderKanban /> Карта
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <LayoutList /> Секции
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Video /> Сесии
                      </Button>
                      <DeleteWorkoutBtn workoutPlanId={plan.workoutPlanId} />
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )
            ) : (
              new Array(data?.plans.length).fill(null).map((_, index) => (
                <Button key={index} variant="ghost">
                  <Shapes className="mr-2 h-4 w-4" />
                </Button>
              ))
            )}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Избери план от листа вляво</h1>
            <p className="text-muted-foreground">
              Тук можеш да редактираш карти, секции и сесии
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
