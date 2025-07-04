import { getCardInfoQueryOptions, patchWorkoutCard } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CirclePlus, Eraser, Loader, Minus, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import type { PatchCardType } from "../../../shared/types";
import { PatchCardSchema } from "../../../server/schemas/zod_schemas";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useEffect } from "react";

const routeApi = getRouteApi("/admin");

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

export const EditCardForm = () => {
  const { planId } = routeApi.useSearch();
  const queryOptions = getCardInfoQueryOptions(planId!);
  const { data, isLoading, error, isError } = useQuery(queryOptions);
  const card = data?.card;

  const defaultValues: PatchCardType = {
    workoutCardId: card?.workoutCardId ?? 0,
    workoutCardTitle: card?.workoutCardTitle ?? "",
    workoutCardImgUrl: card?.workoutCardImgUrl ?? "",
    workoutCardPrice: card?.workoutCardPrice ?? 0,
    workoutCardEquipment: card?.workoutCardEquipment ?? [],
    workoutCardTargetMuscles: card?.workoutCardTargetMuscles ?? [],
    stripePriceId: card?.stripePriceId ?? "",
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: PatchCardSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await patchWorkoutCard(planId!, value);
      toast(res.msg);
    },
  });

  if (isError) {
    toast.error("Изникна грешка: " + error.message);
    return <p>{error.message}</p>;
  }

  // refresh defaultValues when
  useEffect(() => {
    if (card) {
      form.reset();
    }
  }, [planId, card]);

  return (
    <Card className="w-full h-full  border-0 md:border-1">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-1 md:text-2xl m-auto">
          <Eraser /> Редактирай карта
        </CardTitle>
        <CardDescription className="md:text-lg">
          Попълни формуляра отдолу
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : !data ? (
          <p>No data</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              <div>
                <form.Field
                  name="workoutCardTitle"
                  children={(field) => {
                    return (
                      <>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 font-semibold"
                        >
                          Име на карта
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
                  name="workoutCardImgUrl"
                  children={(field) => {
                    return (
                      <>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 font-semibold"
                        >
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
                  name="stripePriceId"
                  children={(field) => {
                    return (
                      <>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 font-semibold"
                        >
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
                  name="workoutCardPrice"
                  children={(field) => {
                    return (
                      <>
                        <Label
                          htmlFor={field.name}
                          className="mb-2 font-semibold"
                        >
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
              <div className="flex flex-col lg:flex-row gap-4 justify-evenly mb-4">
                <div>
                  <Label className="mb-2 font-semibold">Мускулни групи</Label>
                  <form.Field
                    name="workoutCardTargetMuscles"
                    mode="array"
                    children={(field) => {
                      return (
                        <div>
                          {field.state.value!.map((_, index) => {
                            return (
                              <form.Field
                                key={index}
                                name={`workoutCardTargetMuscles[${index}]`}
                              >
                                {(subField) => {
                                  return (
                                    <div className="mb-2">
                                      <div className="flex gap-2">
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
                                            className="w-fit"
                                            value={subField.state.value}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.value
                                              )
                                            }
                                            onBlur={subField.handleBlur}
                                          />
                                        </Label>
                                        <Button
                                          size={"icon"}
                                          className="rounded-full"
                                          onClick={() =>
                                            field.removeValue(index)
                                          }
                                          type="button"
                                        >
                                          <Minus />
                                        </Button>
                                      </div>
                                      <FieldInfo field={subField} />
                                    </div>
                                  );
                                }}
                              </form.Field>
                            );
                          })}
                          <Button
                            onClick={() => field.pushValue("")}
                            type="button"
                          >
                            <CirclePlus /> Добави
                          </Button>
                        </div>
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="mb-2 font-semibold">Екипировка</Label>
                  <form.Field
                    name="workoutCardEquipment"
                    mode="array"
                    children={(field) => {
                      return (
                        <div>
                          {field.state.value?.map((_, index) => {
                            return (
                              <form.Field
                                key={index}
                                name={`workoutCardEquipment[${index}]`}
                              >
                                {(subField) => {
                                  return (
                                    <div className="mb-2">
                                      <div className="flex gap-2">
                                        <Label
                                          htmlFor={subField.name}
                                          className="flex"
                                        >
                                          <div className="w-fit">
                                            Номер {index + 1}
                                          </div>
                                          <Input
                                            id={subField.name}
                                            name={subField.name}
                                            type="text"
                                            className="w-fit"
                                            value={subField.state.value}
                                            onChange={(e) =>
                                              subField.handleChange(
                                                e.target.value
                                              )
                                            }
                                            onBlur={subField.handleBlur}
                                          />
                                        </Label>
                                        <Button
                                          size={"icon"}
                                          className="rounded-full"
                                          onClick={() =>
                                            field.removeValue(index)
                                          }
                                          type="button"
                                        >
                                          <Minus />
                                        </Button>
                                      </div>
                                      <FieldInfo field={subField} />
                                    </div>
                                  );
                                }}
                              </form.Field>
                            );
                          })}
                          <Button
                            onClick={() => field.pushValue("")}
                            type="button"
                          >
                            <CirclePlus /> Добави
                          </Button>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type={"submit"}
                  disabled={!canSubmit}
                  className={"w-full"}
                >
                  {isSubmitting ? (
                    "..."
                  ) : (
                    <span className="flex items-center gap-1">
                      <Send /> Обнови
                    </span>
                  )}
                </Button>
              )}
            />
          </form>
        )}
      </CardContent>
    </Card>
  );
};
