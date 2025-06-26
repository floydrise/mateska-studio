import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { Brush, Diamond, FolderKanban, Send, Trash } from "lucide-react";
import { WorkoutSchema } from "../../../server/schemas/zod_schemas";
import type { WorkoutFormType } from "../../../shared/types";

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

const defaultFormValues: WorkoutFormType = {
  workoutPlanTitle: "",
  card: {
    cardTitle: "",
    imgUrl: "",
    stripePriceId: "",
    price: 0,
    targetMuscles: [],
    equipment: [],
  },
  sections: [],
};

export const CreateWorkoutCard = () => {
  const form = useForm({
    defaultValues: defaultFormValues,
    validators: {
      onChange: WorkoutSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Card className="max-w-xl m-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 md:text-2xl">
          <Brush /> Създай нов план
        </CardTitle>
        <CardDescription className="md:text-lg">
          Попълни формуляра отдолу
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Workout Plan Title */}
            <p className="text-lg flex gap-1 items-center font-semibold">
              <Diamond /> План
            </p>
            <div>
              <form.Field
                name="workoutPlanTitle"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name} className="mb-2">
                        Име на план
                      </Label>
                      <Input
                        type="text"
                        placeholder="Тренирай с мен"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>

            {/* Card info */}
            <p className="text-lg flex gap-1 items-center font-semibold">
              <FolderKanban /> Карта
            </p>
            <div>
              <form.Field
                name="card.cardTitle"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name} className="mb-2">
                        Име на план
                      </Label>
                      <Input
                        type="text"
                        placeholder="Тренирай с мен"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="card.imgUrl"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name} className="mb-2">
                        Линк към снимка
                      </Label>
                      <Input
                        type="text"
                        placeholder="https://www.example.com"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="card.stripePriceId"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name} className="mb-2">
                        Stripe Price ID
                      </Label>
                      <Input
                        type="text"
                        placeholder="price_..."
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="card.price"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name} className="mb-2">
                        Цена абонамент
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Цена"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="card.targetMuscles"
                mode="array"
                children={(field) => {
                  return (
                    <div>
                      {field.state.value.map((_, index) => {
                        return (
                          <form.Field
                            key={index}
                            name={`card.targetMuscles[${index}]`}
                          >
                            {(subField) => {
                              return (
                                <div className="mb-2">
                                  <Label
                                    htmlFor={subField.name}
                                    className="flex"
                                  >
                                    <div className="w-fit">
                                      Група {index + 1}
                                    </div>
                                    <Input
                                      id={subField.name}
                                      name={subField.name}
                                      type="text"
                                      className="w-1/2"
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                    />
                                  </Label>

                                  <FieldInfo field={subField} />
                                </div>
                              );
                            }}
                          </form.Field>
                        );
                      })}
                      <Button onClick={() => field.pushValue("")} type="button">
                        Мускулна група
                      </Button>
                    </div>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="card.equipment"
                mode="array"
                children={(field) => {
                  return (
                    <div>
                      {field.state.value.map((_, index) => {
                        return (
                          <form.Field
                            key={index}
                            name={`card.equipment[${index}]`}
                          >
                            {(subField) => {
                              return (
                                <div className="mb-2">
                                  <Label
                                    htmlFor={subField.name}
                                    className="flex"
                                  >
                                    <div className="w-fit">
                                      Екипировка {index + 1}
                                    </div>
                                    <Input
                                      id={subField.name}
                                      name={subField.name}
                                      type="text"
                                      className="w-1/2"
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                    />
                                  </Label>

                                  <FieldInfo field={subField} />
                                </div>
                              );
                            }}
                          </form.Field>
                        );
                      })}
                      <Button onClick={() => field.pushValue("")} type="button">
                        Екипировка
                      </Button>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 mt-4">
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              variant={"outline"}
              className={
                "md:w-2/5 w-1/2 transition duration-300 ease-in-out hover:-translate-y-1 hover:-translate-x-1 hover:scale-105"
              }
            >
              <Trash /> Нулирай
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type={"submit"}
                  disabled={!canSubmit}
                  className={
                    "md:w-2/5 w-1/2 transition duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:scale-105"
                  }
                >
                  {isSubmitting ? (
                    "..."
                  ) : (
                    <span className="flex items-center gap-1">
                      <Send /> Изпрати
                    </span>
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
