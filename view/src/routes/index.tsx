import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Book,
  Dumbbell,
  MessageCircleQuestion,
  Pyramid,
  Sparkles,
  Store,
} from "lucide-react";
import { getWorkoutCardsQueryOptions } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Testimonials from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import Threads from "@/components/ThreadsBg";
import BlurText from "@/components/BlurText";
import SplitText from "@/components/SplitText";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

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
    getWorkoutCardsQueryOptions,
  );
  const { resolvedTheme } = useTheme();
  if (isError) toast.error(error.message);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <main id="top" className="overflow-hidden">
      <section className="flex flex-col md:flex-row gap-4 justify-between items-center mt-10 px-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-center md:text-start max-w-xl">
            <BlurText
              text="Твоето фитнес пътешествие започва тук 🔥"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-bold"
            />
            <SplitText
              text="Тренировки с професионален инструктор - вкъщи, в парка или във фитнеса"
              className="text-lg text-muted-foreground"
              delay={150}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="start"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              scale: { type: "spring", visualDuration: 1, bounce: 0.2 },
            }}
          >
            <Link to="/" hash="products">
              <Button
                size={"lg"}
                className="transition duration-1000 hover:scale-105 animate-bounce"
              >
                <Dumbbell /> Виж тренировки
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
          }}
          className="w-fit animate-rotate-border rounded-xl bg-conic/[from_var(--border-angle)] from-background via-sky-500 to-background from-80% via-90% to-100% p-0.5 dark:p-px"
        >
          <img
            src="https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/mateska_landing_page.webp"
            alt="Pic of Mateska"
            className="w-140 h-auto rounded-xl"
          />
        </motion.div>
      </section>
      <div className="w-full h-40 md:h-80 relative rotate-180">
        <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
      </div>

      {resolvedTheme === "light" ? (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}

      {/* Why us */}
      <section className="bg-accent px-10 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center"
        >
          <Sparkles /> Защо да избереш нас?
        </motion.h1>
        <ul className="flex md:flex-row flex-col items-center gap-6 justify-evenly">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              scale: { type: "tween", visualDuration: 2 },
            }}
            className="flex flex-col items-center w-fit"
          >
            <img
              src={
                "https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/meditation.webp"
              }
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-base md:text-xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
              Стегни тялото си
            </li>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 2,
              scale: { type: "tween", visualDuration: 2 },
            }}
            className="flex flex-col items-center w-fit"
          >
            <img
              src={
                "https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/deadline.webp"
              }
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-base md:text-xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
              Без излишно време
            </li>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              duration: 2,
              scale: { type: "tween", visualDuration: 2 },
            }}
            className="flex flex-col items-center w-fit"
          >
            <img
              src={
                "https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/scale_1.webp"
              }
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-base md:text-xl text-transparent bg-clip-text bg-linear-to-r from-red-400 to-blue-400">
              Ум и тяло в баланс
            </li>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.7,
              duration: 2,
              scale: { type: "tween", visualDuration: 2 },
            }}
            className="flex flex-col items-center w-fit"
          >
            <img
              src={
                "https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/dashboard.webp"
              }
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-base md:text-xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
              На всяко устройство
            </li>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.9,
              duration: 2,
              scale: { type: "tween", visualDuration: 2 },
            }}
            className="flex flex-col items-center w-fit"
          >
            <img
              src={
                "https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/why_us_section_landing_page/mirror_1.webp"
              }
              alt="Image of a slim waist"
              className="size-20"
            />
            <li className="text-base md:text-xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
              Следи напредъка си
            </li>
          </motion.div>
        </ul>
      </section>

      {resolvedTheme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}

      {/* Workout plans */}
      <section id="products" className="px-10 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center"
        >
          <Store /> Тренировъчни програми
        </motion.h1>
        <div className={"flex justify-center h-full w-full gap-4"}>
          {isLoading ? (
            new Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index + "la"} className="w-100 h-120" />
              ))
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="w-[95%] h-full"
            >
              <CarouselContent>
                {data?.cards.map((card) => (
                  <CarouselItem
                    key={card.workoutCardId}
                    className="xl:basis-1/3 md:basis-1/2"
                  >
                    <WorkoutCard workoutCard={card} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>

      {resolvedTheme === "light" ? (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}

      {/* Testimonials */}
      <section className="bg-accent px-10 py-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2"
        >
          <Pyramid /> Отзиви на клиенти
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.5,
          }}
          className="mt-10"
        >
          <Testimonials />
        </motion.div>
      </section>

      {resolvedTheme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}

      {/* How to use */}
      <section id="howTo" className="px-10 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2"
        >
          <Book /> Как се ползва?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.5,
          }}
          className="relative w-full pt-[56.25%]"
        >
          <iframe
            src="https://player.vimeo.com/video/1161138060?badge=0&autopause=0&player_id=0&app_id=58479"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="MateskaSport - How to use"
          />
        </motion.div>
      </section>

      {resolvedTheme === "light" ? (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}

      {/* FAQ */}
      <section id="faq" className="bg-accent px-10 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="text-xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-center"
        >
          <MessageCircleQuestion /> Често задавани въпроси
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
        >
          <FAQ />
        </motion.div>
      </section>

      {resolvedTheme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#F5F5F5"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z" fill="#262626"></path>
        </svg>
      )}
    </main>
  );
}
