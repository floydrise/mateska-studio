import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  User,
  CreditCard,
  Lock,
  Globe,
  Cookie,
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Card className="max-w-3xl mx-auto my-10 p-6 space-y-6">
      <CardContent className="space-y-6 ">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Политика за поверителност
        </h1>
        <p className="text-sm text-muted-foreground">
          Последна актуализация: 23 юни 2025
        </p>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <User className="text-primary" /> Каква информация събираме
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Име, имейл адрес</li>
            <li>IP адрес, браузър, устройство</li>
            <li>Платежна информация чрез Stripe (не се съхранява локално)</li>
            <li>Данни за активност – избрани планове, завършени сесии</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Globe className="text-primary" /> Как използваме информацията
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>За достъп до закупени планове</li>
            <li>Подобряване на платформата</li>
            <li>Обработка на плащания</li>
            <li>Изпращане на уведомления</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Lock className="text-primary" /> Сигурност и защита
          </h2>
          <p>
            Използваме криптиране (SSL) и ограничен достъп до чувствителна
            информация. Данните се съхраняват в сигурна база данни.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <CreditCard className="text-primary" /> Споделяне с трети страни
          </h2>
          <p>
            Данните не се споделят с рекламодатели. Единствено Stripe получава
            платежна информация. При правно изискване можем да предадем
            информация на компетентни органи.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Cookie className="text-primary" /> Използване на бисквитки
          </h2>
          <p>
            Използваме функционални бисквитки за подобряване на потребителското
            изживяване. Не съхраняват лични данни без съгласие.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <User className="text-primary" /> Вашите права
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Достъп до вашите данни</li>
            <li>Редакция или изтриване</li>
            <li>Ограничаване на обработката</li>
            <li>Оттегляне на съгласие</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Mail className="text-primary" /> Контакт с нас
          </h2>
          <p>
            За въпроси, свързани с поверителността, можете да се свържете с нас
            на:
          </p>
          <p className="font-medium">📧 example@email.com</p>
          <p className="font-medium">📍 Бургас, България</p>
        </section>
      </CardContent>
    </Card>
  );
}
