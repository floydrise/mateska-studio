import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, UserCheck, Shield, XCircle, Info, Mail } from "lucide-react";

export default function TermsOfUse() {
  return (
    <Card className="max-w-3xl mx-auto my-10 p-6 space-y-6">
      <CardContent className="space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="text-primary" />
          Условия за ползване
        </h1>
        <p className="text-sm text-muted-foreground">
          Последна актуализация: 23 юни 2025
        </p>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <UserCheck className="text-primary" />
            Приемане на условията
          </h2>
          <p>
            С използването на нашата платформа Вие се съгласявате с настоящите
            условия. Ако не сте съгласни, моля не използвайте услугата.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Shield className="text-primary" />
            Права и задължения на потребителя
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Да предоставяте вярна информация при регистрация</li>
            <li>Да използвате платформата само за лични цели</li>
            <li>Да не копирате или разпространявате съдържание</li>
            <li>Да спазвате законовите изисквания</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <XCircle className="text-primary" />
            Ограничения и забрани
          </h2>
          <p>
            Забранено е използването на услугата с цел измама, обида или
            нарушаване на авторски права. Нарушенията могат да доведат до
            блокиране на достъпа.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Info className="text-primary" />
            Отказ от отговорност
          </h2>
          <p>
            Платформата не носи отговорност за вреди, възникнали от неправилна
            употреба на тренировъчни програми или неправомерен достъп до
            профили. Винаги се консултирайте със специалист при съмнение.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <FileText className="text-primary" />
            Промяна на условията
          </h2>
          <p>
            Запазваме правото си да променяме условията по всяко време.
            Промените влизат в сила след публикуване. Препоръчваме редовно да ги
            преглеждате.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Mail className="text-primary" />
            Контакт с нас
          </h2>
          <p>
            При въпроси относно условията за ползване, моля свържете се с нас:
          </p>
          <p className="font-medium">📧 floydrise@gmail.com</p>
          <p className="font-medium">📍 Бургас, България</p>
        </section>
      </CardContent>
    </Card>
  );
}
