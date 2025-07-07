import {
  getSectionsByPlanIdQueryOptions,
  patchWorkoutSections,
} from "@/lib/api";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { PatchSectionsSchema } from "../../../server/schemas/zod_schemas";
import type { PatchSectionType } from "../../../shared/types";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eraser, Loader, Send } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
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

export const EditSectionsForm = () => {
  const { planId } = routeApi.useSearch();
  const queryOptions = getSectionsByPlanIdQueryOptions(planId!);
  const { data, isLoading, error, isError } = useQuery(queryOptions);
  const updatedMutation = useMutation({
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
  });

  const defaultValues: { sections: PatchSectionType[] } = {
    sections: data?.sections ?? [],
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: PatchSectionsSchema,
    },
    onSubmit: async ({ value }) => {
      value.sections.forEach((section) =>
        updatedMutation.mutate({
          planId: planId!,
          sectionId: section.sectionId!,
          updatedSection: section,
        })
      );
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
            <form.Field
              name="sections"
              mode="array"
              children={(field) => {
                return (
                  <div className="flex flex-col md:flex-row items-center justify-evenly">
                    {field.state.value!.map((_, index) => {
                      return (
                        <div key={index}>
                          <h1 className="font-semibold">Секция {index + 1}</h1>
                          <form.Field name={`sections[${index}].sectionTitle`}>
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
                                          subField.handleChange(e.target.value)
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
                          <form.Field name={`sections[${index}].position`}>
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
