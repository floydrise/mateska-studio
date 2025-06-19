import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import type { UserWorkoutType } from "../../../shared/types";

export default function UserWorkout({
  userWorkout,
}: {
  userWorkout: UserWorkoutType;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sectionInfo, setSectionInfo] = useState<{
    index: number;
    title: string;
  }>({
    index: 0,
    title: userWorkout.sections[0].sectionTitle,
  });
  const [content, setContent] = useState<{
    title: string;
    videoUrl: string;
    description: string;
  }>({
    title:
      userWorkout.sections[sectionInfo.index].sessions[sessionIndex]
        .sessionTitle,
    videoUrl:
      userWorkout.sections[sectionInfo.index].sessions[sessionIndex].videoUrl,
    description:
      userWorkout.sections[sectionInfo.index].sessions[sessionIndex]
        .description,
  });

  return (
    <div className="flex h-screen">
      <aside
        className={`${
          isOpen ? "w-42 md:w-80" : "w-16"
        } flex flex-col border-r transition-all duration-500 ease-in-out`}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <span
            className={`${isOpen ? "block" : "hidden"} md:text-lg font-semibold`}
          >
            Секции
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight
              className={`h-6 w-6 ${isOpen ? "transition duration-700 rotate-180" : "transition duration-700 rotate-0"}`}
            />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2">
            {isOpen ? (
              userWorkout.sections.map((section, index) => (
                <Collapsible key={section.sectionId}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full h-fit justify-start"
                      onClick={() =>
                        setSectionInfo({
                          index,
                          title: section.sectionTitle,
                        })
                      }
                    >
                      {isOpen && (
                        <>
                          <span className="text-wrap">
                            {section.sectionTitle}
                          </span>
                          <ChevronDown className={`ml-auto h-4 w-4`} />
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
                        onClick={() => {
                          setContent({
                            title: session.sessionTitle,
                            videoUrl: session.videoUrl,
                            description: session.description,
                          });
                          setSessionIndex(index);
                        }}
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
                      <Dumbbell className=" h-4 w-4" />
                    </Button>
                  ))}
              </div>
            )}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col max-w-screen items-center gap-10 md:my-10">
        <div className="flex items-center justify-between w-full md:w-1/2">
          <Button
            size={"icon"}
            className="ml-2 rounded-full transform duration-500 hover:scale-110"
            onClick={() => {
              setSessionIndex((prev) => {
                const previousIndex = prev - 1;
                if (previousIndex >= 0) {
                  const prevSession =
                    userWorkout.sections[sectionInfo.index].sessions[
                      previousIndex
                    ];
                  setContent({
                    title: prevSession.sessionTitle,
                    videoUrl: prevSession.videoUrl,
                    description: prevSession.description,
                  });
                  return previousIndex;
                }

                return prev;
              });
            }}
          >
            <ChevronLeft />
          </Button>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground">{sectionInfo.title}</p>
            <h1 className="text-2xl font-bold">{content?.title}</h1>
          </div>
          <Button
            size={"icon"}
            className="mr-2 rounded-full transform duration-500 hover:scale-110"
            onClick={() => {
              setSessionIndex((prev) => {
                const nextIndex = prev + 1;

                if (
                  nextIndex <
                  userWorkout.sections[sectionInfo.index].sessions.length
                ) {
                  const nextSession =
                    userWorkout.sections[sectionInfo.index].sessions[nextIndex];
                  setContent({
                    title: nextSession.sessionTitle,
                    videoUrl: nextSession.videoUrl,
                    description: nextSession.description,
                  });
                  return nextIndex;
                }

                return prev;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
        <iframe
          src={content.videoUrl}
          title={content.title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
        <p className="text-center">{content?.description}</p>
      </main>
    </div>
  );
}
