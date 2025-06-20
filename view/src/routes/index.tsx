import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Dumbbell, Pyramid, Sparkles, Store } from "lucide-react";
import girlMeditatingImg from "/lotus.png";
import hourGlassImg from "/hourglass.png";
import scaleImg from "/scale.png";
import monitorImg from "/monitor.png";
import mirrorImg from "/mirror.png";
import { getWorkoutCardsQueryOptions } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Testimonials from "@/components/Testimonials";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Начална страница на MateskaSport Studio. Запознайте се с платформата",
      },
      {
        title: "Home • Mateska Studio",
      },
    ],
  }),
});

function App() {
  const { isLoading, error, data, isError } = useQuery(
    getWorkoutCardsQueryOptions
  );
  if (isError) toast.error(error.message);
  return (
    <main>
      <section className="flex flex-col md:flex-row gap-4 justify-between items-center my-10 px-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-center md:text-start max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold">
              Твоето фитнес пътешествие започва тук!
            </h1>
            <h2 className="text-lg text-muted-foreground">
              Тренировки с професионален инструктор - вкъщи, в парка или във
              фитнеса
            </h2>
          </div>
          <Button
            size={"lg"}
            className="transition duration-500 hover:scale-105"
          >
            <Dumbbell /> Виж тренировки
          </Button>
        </div>
        <img
          src="https://mateskasport.com/wp-content/uploads/2023/08/3.jpg"
          alt="Pic of Mateska"
          className="w-140 h-auto rounded-xl"
        />
      </section>
      <section className="bg-accent px-10 py-20">
        <h1 className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center">
          <Sparkles /> Защо да избереш нас?
        </h1>
        <ul className="list-disc flex md:flex-row flex-col items-center gap-6 justify-evenly">
          <div className="flex flex-col items-center w-fit">
            <img
              src={girlMeditatingImg}
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-xl">Стегни тялото си</li>
          </div>
          <div className="flex flex-col items-center w-fit">
            <img
              src={hourGlassImg}
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-xl">Без излишно време</li>
          </div>
          <div className="flex flex-col items-center w-fit">
            <img
              src={scaleImg}
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-xl">Ум и тяло в баланс</li>
          </div>
          <div className="flex flex-col items-center w-fit">
            <img
              src={monitorImg}
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-xl">На всяко устройство</li>
          </div>
          <div className="flex flex-col items-center w-fit">
            <img
              src={mirrorImg}
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-xl">Следи напредъка си</li>
          </div>
        </ul>
      </section>
      <section className="px-10 py-10">
        <h1 className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center">
          <Store /> Тренировъчни програми
        </h1>
        {isLoading ? (
          <p>зарежда ...</p>
        ) : (
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 place-items-center gap-4"
            }
          >
            {data?.cards.map((card) => (
              <WorkoutCard key={card.workoutCardId} workoutCard={card} />
            ))}
          </div>
        )}
      </section>
      <section className="bg-accent px-10 py-10">
        <h1 className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center">
          <Pyramid /> Отзиви на клиенти
        </h1>
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>
    </main>
  );
}
