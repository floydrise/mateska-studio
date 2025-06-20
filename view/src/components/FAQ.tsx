import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <div className="border rounded-xl">
        <AccordionItem value="item-1" className="px-4">
          <AccordionTrigger className="text-lg">
            Как работи платформата?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              След като се регистрирате, ще имате достъп до различни
              тренировъчни програми. Можете да закупите план и да следвате
              видеа, които са разделени по секции и сесии.
            </p>
            <p>
              Всеки план включва подробни инструкции, демонстрации и описание на
              упражненията, подходящи както за начинаещи, така и за напреднали.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="px-4">
          <AccordionTrigger className="text-lg">
            Как става плащането и какво получавам?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Плащането се извършва сигурно чрез Stripe, като можете да изберете
              между еднократно плащане или абонамент. След успешно плащане ще
              получите незабавен достъп до закупения тренировъчен план.
            </p>
            <p>
              Ще можете да следите напредъка си и да маркирате завършените
              сесии.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="px-4">
          <AccordionTrigger className="text-lg">
            Подходяща ли е програмата за начинаещи?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Да! Повечето от нашите програми са създадени с мисъл за начинаещи.
              Всяка сесия съдържа видео и обяснение как да се изпълняват
              упражненията правилно.
            </p>
            <p>
              Можете да започнете с по-лек план и с течение на времето да
              преминете към по-интензивни тренировки.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="px-4">
          <AccordionTrigger className="text-lg">
            Трябва ли ми специално оборудване?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Не е задължително. Някои от програмите изискват минимално
              оборудване (като дъмбели или ластици), докато други са напълно
              подходящи за домашни условия без никакви уреди.
            </p>
            <p>
              В описанието на всеки план ще откриете списък с необходимото
              оборудване, ако такова се изисква.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="px-4">
          <AccordionTrigger className="text-lg">
            Как мога да следя напредъка си?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              След всяка завършена сесия можете да я маркирате като „Изпълнена“.
              Така лесно ще следите кои части от програмата сте преминали.
            </p>
            <p>
              В бъдеще ще добавим и допълнителна статистика и възможности за
              проследяване на резултатите ви.
            </p>
          </AccordionContent>
        </AccordionItem>
      </div>
    </Accordion>
  );
}
