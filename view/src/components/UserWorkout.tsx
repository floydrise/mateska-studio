import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, Menu, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { UserWorkoutType } from "../../../shared/types";

export default function UserWorkout({
  userWorkout,
}: {
  userWorkout: UserWorkoutType;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [content, setContent] = useState<{
    title: string;
    videoUrl: string;
    description: string;
  }>({
    title: userWorkout.sections[0].sessions[0].sessionTitle,
    videoUrl: userWorkout.sections[0].sessions[0].videoUrl,
    description: userWorkout.sections[0].sessions[0].description,
  });
  return (
    <div className="flex h-screen">
      <aside
        className={`${
          isOpen ? "w-42 md:w-80" : "w-16"
        } flex flex-col border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex min-h-fit items-center justify-between border-b px-4">
          <span
            className={`${isOpen ? "block" : "hidden"} md:text-lg font-semibold`}
          >
            {userWorkout.planTitle}
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
              userWorkout.sections.map((section) => (
                <Collapsible key={section.sectionId}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full h-fit justify-start"
                    >
                      {/* <Dumbbell className="mr-2 h-4 w-4" /> */}
                      {isOpen && (
                        <>
                          <span className="text-wrap">
                            {section.sectionTitle}
                          </span>
                          <ChevronUp className={`ml-auto h-4 w-4 rotate-180`} />
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 space-y-1">
                    {section.sessions.map((session, index) => (
                      <Button
                        key={session.sessionTitle + index}
                        variant="ghost"
                        size="sm"
                        className="w-full min-h-fit justify-start border-l"
                        onClick={() =>
                          setContent({
                            title: session.sessionTitle,
                            videoUrl: session.videoUrl,
                            description: session.description,
                          })
                        }
                      >
                        <span className="text-wrap">
                          {session.sessionTitle}
                        </span>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : (
              <div className="flex flex-col">
                {new Array(userWorkout.sections.length)
                  .fill(null)
                  .map((_, index) => (
                    <Button key={index} variant="ghost">
                      <Dumbbell className="mr-2 h-4 w-4" />
                    </Button>
                  ))}
              </div>
            )}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col max-w-screen items-center gap-10 my-10">
        <h1 className="text-2xl font-bold">{content?.title}</h1>
        <iframe
          src={content?.videoUrl}
          title="YouTube video player"
          allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
          allowFullScreen
          className={`w-10/11 h-5/6 rounded-lg`}
        ></iframe>
        <p className="text-center">{content?.description}</p>
      </main>
    </div>
  );
}
