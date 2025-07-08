import {
  deleteSection,
  getUserWorkoutPlanQueryOptions,
  putSectionsByPlanId,
} from "@/lib/api";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Ellipsis,
  Eraser,
  Flower,
  Loader,
  MinusCircle,
  Send,
  Trash,
  Video,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// TODO: Create delete section

export const EditSectionsForm = () => {
  const queryClient = useQueryClient();
  const [expandedSessions, setExpandedSessions] = useState<
    Record<string, boolean>
  >({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const { planId } = routeApi.useSearch();
  const queryOptions = getUserWorkoutPlanQueryOptions(String(planId));
  const { data, isLoading, error, isError } = useQuery(queryOptions);

  // Mutations
  const deleteSectionMutation = useMutation({
    mutationFn: ({
      planId,
      sectionId,
    }: {
      planId: number;
      sectionId: number;
    }) => deleteSection({ planId, sectionId }),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-workout", String(planId!)],
      });
      toast.success("Успешно изтри секция");
    },
  });
  const updatedMutation = useMutation({
    mutationFn: ({
      planId,
      updatedSection,
    }: {
      planId: number;
      updatedSection: PatchSectionFormType;
    }) => putSectionsByPlanId({ planId, data: updatedSection }),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Успешно редактира информацията");
    },
  });

  const defaultValues: PatchSectionFormType = {
    sections: data?.sections ?? [],
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: PatchSectionsFormSchema,
    },
    onSubmit: async ({ value }) => {
      updatedMutation.mutate({ planId: planId!, updatedSection: value });
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
                    {field.state.value!.map((innerData, index) => {
                      return (
                        <div key={index} className="border p-4 rounded-2xl">
                          <span className="font-semibold flex gap-1 justify-between text-xl mb-2">
                            <div className="flex items-center gap-4">
                              <span
                                onClick={() =>
                                  setExpandedSections((prev) => ({
                                    ...prev,
                                    [`${index}-${index}`]:
                                      !prev[`${index}-${index}`],
                                  }))
                                }
                                className="flex items-center gap-1 hover:cursor-pointer"
                              >
                                <Boxes /> Секция #{index + 1}
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="hover:cursor-pointer">
                                  <Ellipsis />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {innerData.sectionId ? (
                                    <DropdownMenuItem asChild>
                                      <Button
                                        className="w-full"
                                        variant={"ghost"}
                                        type="button"
                                        onClick={() =>
                                          deleteSectionMutation.mutate({
                                            planId: planId!,
                                            sectionId: innerData.sectionId!,
                                          })
                                        }
                                      >
                                        <Trash /> Изтрии
                                      </Button>
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem asChild>
                                      <Button
                                        className="w-full"
                                        variant={"ghost"}
                                        onClick={() => field.removeValue(index)}
                                        type="button"
                                      >
                                        <MinusCircle /> Премахни
                                      </Button>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <ChevronDown
                              onClick={() =>
                                setExpandedSections((prev) => ({
                                  ...prev,
                                  [`${index}-${index}`]:
                                    !prev[`${index}-${index}`],
                                }))
                              }
                              className={`hover:cursor-pointer ${
                                expandedSections[`${index}-${index}`]
                                  ? "transition duration-500 rotate-180"
                                  : "transition duration-500 rotate-0"
                              }`}
                            />
                          </span>
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
                                                {innerData.sessionTitle ||
                                                  "Нова сесия"}
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
                                              <MinusCircle /> Премахни сесия
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
                    <Button
                      onClick={() =>
                        field.pushValue({
                          sectionTitle: "",
                          sectionPosition: 0,
                          sessions: [],
                        })
                      }
                      type="button"
                      className="w-fit"
                    >
                      <CirclePlus /> Секция
                    </Button>
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
