import { getUserWorkoutPlanQueryOptions } from "@/lib/api";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { PatchSectionsFormSchema } from "../../../server/schemas/zod_schemas";
import type { PatchSectionFormType } from "../../../shared/types";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Boxes,
  ChevronDown,
  CirclePlus,
  Eraser,
  Flower,
  Loader,
  MinusCircle,
  Send,
  Video,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

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

export const EditSectionsForm = () => {
  const [expandedSessions, setExpandedSessions] = useState<
    Record<string, boolean>
  >({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const { planId } = routeApi.useSearch();
  const queryOptions = getUserWorkoutPlanQueryOptions(String(planId));
  const { data, isLoading, error, isError } = useQuery(queryOptions);

  /* const updatedMutation = useMutation({
    mutationFn: ({
      planId,
      sectionId,
      updatedSection,
    }: {
      planId: number;
      sectionId: number;
      updatedSection: PatchSectionType;
    }) => patchWorkoutSections({ planId, sectionId, updatedSection }),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(
        "Успешно ъпдейтна секция: " + data.updatedSection.sectionTitle
      );
    },
  }); */

  const defaultValues: PatchSectionFormType = {
    sections: data?.sections ?? [],
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: PatchSectionsFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  if (isError) {
    toast.error("Изникна грешка: " + error.message);
    return <p>{error.message}</p>;
  }

  // refresh defaultValues when
  useEffect(() => {
    if (data?.sections) {
      form.reset();
    }
  }, [planId, data?.sections]);

  return (
    <Card className="w-full h-full  border-0 md:border-1">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-1 md:text-2xl m-auto">
          <Eraser /> Редактирай секции
        </CardTitle>
        <CardDescription className="md:text-lg">
          Добави, премахни или редактирай секции и сесии
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
            <form.Field
              name="sections"
              mode="array"
              children={(field) => {
                return (
                  <div className="flex flex-col gap-4">
                    {field.state.value!.map((_, index) => {
                      return (
                        <div key={index} className="border p-4 rounded-2xl">
                          <h1
                            onClick={() =>
                              setExpandedSections((prev) => ({
                                ...prev,
                                [`${index}-${index}`]:
                                  !prev[`${index}-${index}`],
                              }))
                            }
                            className="font-semibold flex gap-1 justify-between text-xl mb-2 hover:cursor-pointer"
                          >
                            <span className="flex items-center gap-1">
                              <Boxes /> Секция #{index + 1}
                            </span>
                            <ChevronDown
                              className={`${
                                expandedSections[`${index}-${index}`]
                                  ? "transition duration-500 rotate-180"
                                  : "transition duration-500 rotate-0"
                              }`}
                            />
                          </h1>
                          <div
                            className={`flex flex-col gap-2 overflow-hidden transition-all duration-700 ease-in-out ${
                              expandedSections[`${index}-${index}`]
                                ? "max-h-fit opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <form.Field
                              name={`sections[${index}].sectionTitle`}
                            >
                              {(subField) => {
                                return (
                                  <div className="mb-2">
                                    <div className="flex gap-2">
                                      <Label
                                        htmlFor={subField.name}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="w-fit">Име: </div>
                                        <Input
                                          id={subField.name}
                                          name={subField.name}
                                          type="text"
                                          className="w-full"
                                          value={subField.state.value}
                                          onChange={(e) =>
                                            subField.handleChange(
                                              e.target.value
                                            )
                                          }
                                          onBlur={subField.handleBlur}
                                        />
                                      </Label>
                                    </div>
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`sections[${index}].sectionPosition`}
                            >
                              {(subField) => {
                                return (
                                  <div className="mb-2">
                                    <div className="flex gap-2">
                                      <Label
                                        htmlFor={subField.name}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="w-fit">Позиция:</div>
                                        <Input
                                          id={subField.name}
                                          name={subField.name}
                                          type="number"
                                          min={0}
                                          className="w-fit"
                                          value={subField.state.value}
                                          onChange={(e) =>
                                            subField.handleChange(
                                              Number(e.target.value)
                                            )
                                          }
                                          onBlur={subField.handleBlur}
                                        />
                                      </Label>
                                    </div>
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`sections[${index}].sessions`}
                              mode="array"
                            >
                              {(subField) => {
                                return (
                                  <div className="mb-2">
                                    <h1 className="text-xl font-semibold mb-2 flex items-center gap-1">
                                      <Video /> Сесии
                                    </h1>
                                    {subField.state.value.map(
                                      (innerData, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className="mb-6 space-y-2 p-2 rounded-2xl border"
                                          >
                                            <h1
                                              onClick={() =>
                                                setExpandedSessions((prev) => ({
                                                  ...prev,
                                                  [`${index}-${i}`]:
                                                    !prev[`${index}-${i}`],
                                                }))
                                              }
                                              className="font-semibold flex items-center justify-between gap-1 hover:cursor-pointer"
                                            >
                                              <span className="flex items-center gap-1">
                                                <Flower />{" "}
                                                {innerData.sessionTitle}
                                              </span>
                                              <ChevronDown
                                                className={`${
                                                  expandedSessions[
                                                    `${index}-${i}`
                                                  ]
                                                    ? "transition duration-500 rotate-180"
                                                    : "transition duration-500 rotate-0"
                                                }`}
                                              />
                                            </h1>
                                            <div
                                              className={`flex flex-col gap-2 overflow-hidden transition-all duration-700 ease-in-out ${
                                                expandedSessions[
                                                  `${index}-${i}`
                                                ]
                                                  ? "max-h-100 opacity-100"
                                                  : "max-h-0 opacity-0"
                                              }`}
                                            >
                                              <form.Field
                                                name={`sections[${index}].sessions[${i}].sessionTitle`}
                                              >
                                                {(innerSubField) => {
                                                  return (
                                                    <div>
                                                      <Label
                                                        htmlFor={
                                                          innerSubField.name
                                                        }
                                                        className="flex gap-2 items-center"
                                                      >
                                                        <div className="w-fit">
                                                          Име:
                                                        </div>
                                                        <Input
                                                          id={
                                                            innerSubField.name
                                                          }
                                                          name={
                                                            innerSubField.name
                                                          }
                                                          type="text"
                                                          className="w-1/2"
                                                          value={
                                                            innerSubField.state
                                                              .value
                                                          }
                                                          onChange={(e) =>
                                                            innerSubField.handleChange(
                                                              e.target.value
                                                            )
                                                          }
                                                          onBlur={
                                                            innerSubField.handleBlur
                                                          }
                                                        />
                                                      </Label>

                                                      <FieldInfo
                                                        field={innerSubField}
                                                      />
                                                    </div>
                                                  );
                                                }}
                                              </form.Field>
                                              <form.Field
                                                name={`sections[${index}].sessions[${i}].sessionPosition`}
                                              >
                                                {(innerSubField) => {
                                                  return (
                                                    <div>
                                                      <Label
                                                        htmlFor={
                                                          innerSubField.name
                                                        }
                                                        className="flex gap-2 items-center"
                                                      >
                                                        <div className="w-fit">
                                                          Позиция:
                                                        </div>
                                                        <Input
                                                          id={
                                                            innerSubField.name
                                                          }
                                                          name={
                                                            innerSubField.name
                                                          }
                                                          type="number"
                                                          min={0}
                                                          className="w-1/2"
                                                          value={
                                                            innerSubField.state
                                                              .value
                                                          }
                                                          onChange={(e) =>
                                                            innerSubField.handleChange(
                                                              Number(
                                                                e.target.value
                                                              )
                                                            )
                                                          }
                                                          onBlur={
                                                            innerSubField.handleBlur
                                                          }
                                                        />
                                                      </Label>

                                                      <FieldInfo
                                                        field={innerSubField}
                                                      />
                                                    </div>
                                                  );
                                                }}
                                              </form.Field>
                                              <form.Field
                                                name={`sections[${index}].sessions[${i}].videoUrl`}
                                              >
                                                {(innerSubField) => {
                                                  return (
                                                    <div>
                                                      <Label
                                                        htmlFor={
                                                          innerSubField.name
                                                        }
                                                        className="flex gap-2 items-center"
                                                      >
                                                        <div className="w-fit">
                                                          Видео линк:
                                                        </div>
                                                        <Input
                                                          id={
                                                            innerSubField.name
                                                          }
                                                          name={
                                                            innerSubField.name
                                                          }
                                                          type="text"
                                                          className="w-1/2"
                                                          value={
                                                            innerSubField.state
                                                              .value
                                                          }
                                                          onChange={(e) =>
                                                            innerSubField.handleChange(
                                                              e.target.value
                                                            )
                                                          }
                                                          onBlur={
                                                            innerSubField.handleBlur
                                                          }
                                                        />
                                                      </Label>

                                                      <FieldInfo
                                                        field={innerSubField}
                                                      />
                                                    </div>
                                                  );
                                                }}
                                              </form.Field>
                                              <form.Field
                                                name={`sections[${index}].sessions[${i}].description`}
                                              >
                                                {(innerSubField) => {
                                                  return (
                                                    <div>
                                                      <Label
                                                        htmlFor={
                                                          innerSubField.name
                                                        }
                                                        className="flex gap-2 items-center"
                                                      >
                                                        <div className="w-fit">
                                                          Описание:
                                                        </div>
                                                        <Textarea
                                                          id={
                                                            innerSubField.name
                                                          }
                                                          name={
                                                            innerSubField.name
                                                          }
                                                          className="w-1/2"
                                                          value={
                                                            innerSubField.state
                                                              .value
                                                          }
                                                          onChange={(e) =>
                                                            innerSubField.handleChange(
                                                              e.target.value
                                                            )
                                                          }
                                                          onBlur={
                                                            innerSubField.handleBlur
                                                          }
                                                        />
                                                      </Label>
                                                      <FieldInfo
                                                        field={innerSubField}
                                                      />
                                                    </div>
                                                  );
                                                }}
                                              </form.Field>
                                            </div>
                                            <Button
                                              className="rounded-full"
                                              onClick={() =>
                                                subField.removeValue(i)
                                              }
                                              type="button"
                                            >
                                              <MinusCircle /> Премахни
                                            </Button>
                                          </div>
                                        );
                                      }
                                    )}
                                    <Button
                                      onClick={() =>
                                        subField.pushValue({
                                          sessionTitle: "",
                                          sessionPosition: 0,
                                          videoUrl: "",
                                          description: "",
                                        })
                                      }
                                      type="button"
                                    >
                                      <CirclePlus /> Сесия
                                    </Button>
                                  </div>
                                );
                              }}
                            </form.Field>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type={"submit"}
                  disabled={!canSubmit}
                  className={"w-full mt-4"}
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
