import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";

import { z } from "zod/v4";
import { Button } from "./ui/button";
import { Calculator, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const TDEESchema = z.object({
  gender: z.enum(["мъж", "жена"], {
    message: "Полето е задължително",
  }),
  age: z
    .string()
    .nonempty("Моля въведи възраст")
    .regex(/^\d+$/, "Възрастта трябва да е число")
    .transform(Number)
    .refine((val) => val > 0 && val < 120, {
      message: "Моля въведи валидна възраст",
    }),
  weight: z
    .string()
    .nonempty("Моля въведи тегло")
    .regex(/^\d+$/, "Теглото трябва да е число")
    .transform(Number)
    .refine((val) => val > 0 && val < 500, {
      message: "Моля въведи валидно тегло",
    }),
  height: z
    .string()
    .nonempty("Моля въведи височина")
    .regex(/^\d+$/, "Височината трябва да е число")
    .transform(Number)
    .refine((val) => val > 50 && val < 250, {
      message: "Моля въведи валидна височина",
    }),
  activity: z.enum(["sedentery", "light", "moderate", "heavy", "athlete"], {
    message: "Избери ниво на активност",
  }),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">
          • {field.state.meta.errors.map((err) => err.message).join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

type TDEEValues = z.infer<typeof TDEESchema>;

const defaultValues = {
  gender: "жена",
  age: "",
  weight: "",
  height: "",
  activity: "",
};

const calcTDEE = ({ gender, age, weight, height, activity }: TDEEValues) => {
  const bmr =
    gender === "мъж"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactor: Record<TDEEValues["activity"], number> = {
    sedentery: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
  };

  return Math.round(bmr * activityFactor[activity]);
};

const calcBMI = ({ weight, height }: { weight: number; height: number }) => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);
  return parseFloat(bmi.toFixed(1));
};

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Поднормено тегло";
  if (bmi < 25) return "Нормално тегло";
  if (bmi < 30) return "Наднормено тегло";
  return "Затлъстяване";
}

export const TDEECalc = () => {
  const [cals, setCals] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: TDEESchema,
    },
    onSubmit: async ({ value }) => {
      const validated = TDEESchema.safeParse(value);
      if (validated.success) {
        const tdee = calcTDEE({
          ...validated.data,
        });
        const bmi = calcBMI({
          weight: validated.data.weight,
          height: validated.data.height,
        });
        setBmi(bmi);
        setCals(tdee);
      } else {
        toast.error(validated.error.message);
      }
    },
  });

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Дневен прием на калории и BMI</CardTitle>
        <CardDescription>
          Попълни полетата и разбери колко калории на ден да консумираш и BMI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-1 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="gender"
            children={(field) => {
              return (
                <>
                  <div className="flex gap-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Пол:
                    </Label>
                    <RadioGroup
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onBlur={field.handleBlur}
                      className="flex"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={"мъж"} id="r1" />
                        <Label htmlFor="r1">Мъж</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={"жена"} id="r2" />
                        <Label htmlFor="r2">Жена</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
          <form.Field
            name="age"
            children={(field) => {
              return (
                <>
                  <div className="flex gap-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Възраст:
                    </Label>
                    <Input
                      className="w-40"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="25"
                    />
                  </div>
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
          <form.Field
            name="weight"
            children={(field) => {
              return (
                <>
                  <div className="flex gap-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Тегло (kg):
                    </Label>
                    <Input
                      className="w-40"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="80"
                    />
                  </div>
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
          <form.Field
            name="height"
            children={(field) => {
              return (
                <>
                  <div className="flex gap-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Височина (cm):
                    </Label>
                    <Input
                      className="w-40"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="180"
                    />
                  </div>
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
          <form.Field
            name="activity"
            children={(field) => {
              return (
                <>
                  <div className="flex gap-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Активност
                    </Label>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        className="w-40"
                        onBlur={field.handleBlur}
                        id={field.name}
                        name={field.name}
                      >
                        <SelectValue placeholder="Активност" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentery">Не тренирам</SelectItem>
                        <SelectItem value="light">
                          Лека (трен. 1-2 дни седмично)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Средна (трен. 3-5 дни седмично)
                        </SelectItem>
                        <SelectItem value="heavy">
                          Висока (трен. 6-7 дни седмично)
                        </SelectItem>
                        <SelectItem value="athlete">
                          Атлет (2 пъти днвено)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
          <div className="flex mt-4 justify-evenly gap-4">
            <Button
              type="button"
              variant={"outline"}
              className="transition duration-500 hover:-rotate-10"
              onClick={() => {
                form.reset();
                setCals(null);
                setBmi(null);
              }}
            >
              <X /> Изтрий
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="transition duration-500 hover:rotate-10"
                  type={"submit"}
                  disabled={!canSubmit}
                >
                  {isSubmitting ? (
                    "..."
                  ) : (
                    <span className="flex items-center gap-1">
                      <Calculator /> Сметни
                    </span>
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {cals && bmi && (
          <div>
            <p className="text-muted-foreground">
              BMI:{" "}
              <span className="font-semibold text-foreground">
                {bmi} - {getBMICategory(bmi)}
              </span>
            </p>
            <p className="text-muted-foreground">
              За поддържане:{" "}
              <span className="font-semibold text-foreground">{cals} cals</span>
            </p>
            <p className="text-muted-foreground">
              За сваляне:{" "}
              <span className="font-semibold text-foreground">
                {cals - 300} cals
              </span>
            </p>
            <p className="text-muted-foreground">
              За качване:{" "}
              <span className="font-semibold text-foreground">
                {cals + 300} cals
              </span>
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
