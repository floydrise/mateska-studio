import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import djulkaImg from "/djulka.webp";
import milicaImg from "/milica.webp";
import dianaImg from "/diana.jpg";
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const Testimonials = () => {
  const [active, setActive] = useState(testimonials[0]);
  const handleprev = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(testimonials[prevIndex]);
  };
  const handlenext = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(testimonials[nextIndex]);
  };
  const isActive = (index: number) => {
    return testimonials[index] === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto">
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotateY: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 20
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
                key={active.name + index}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={400}
                  height={400}
                  draggable={false}
                  className="rounded-3xl h-full w-full  object-cover object-center"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div>
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active.name}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold dark:text-white text-black">
                {active.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {active.designation}
              </p>
              <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
                {active.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
          <div className="flex gap-6 pt-5">
            <Button
              className="h-8 transition duration-500 hover:rotate-10 rounded"
              onClick={handleprev}
            >
              <ArrowLeft />
            </Button>
            <Button
              className="h-8 transition duration-500 hover:-rotate-10 rounded"
              onClick={handlenext}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;

const testimonials: Testimonial[] = [
  {
    quote:
      "Алекс е повече от треньор – тя е двигателят зад промяната ми. Без нея нямаше да направя и крачка към мечтаното тяло. Всеки съвет, всяка тренировка, всяка подкрепа – всичко има значение. Благодаря ти от сърце, Алекс!",
    name: "Джулия",
    designation: "Маникюристка, Бургас",
    src: djulkaImg,
  },
  {
    quote:
      "За нея имам само една дума и тя е СЪРЦЕ! Подхожда към всеки с внимание и според неговите индивидуални нужди и възможности, за да постигне мечтания от всеки резултат. Тренировките са страхотни не само за извайване на тялото ,но и за тонус и сила на съзнанието. Благодарна съм, че я срещнах. Тя промени живота ми като ми показа, че здравословния начин на живот е един голям и страхотен свят!",
    name: "Милица Петрива",
    designation: "Маникюристка, Бургас",
    src: milicaImg,
  },
  {
    quote:
      "Когато искаш да тренираш , а времето за тренировка не съответсва с твоето свободно, може да направиш като мен: тренировки онлайн от Александра Матеска по всяко време в къщи лесно и удобно постигаш невероятни резултати. Единственото което се иска е желание. 💋 Благодаря Алекс , че намираш вариант да задоволиш капризите на всеки твой клиент 💋 💖",
    name: "Диана Ташева",
    designation: "Майка на две деца, Бургас",
    src: dianaImg,
  },
];
