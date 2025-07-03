import { getCardInfoQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const routeApi = getRouteApi("/admin");

export const EditCardForm = () => {
  const { planId } = routeApi.useSearch();
  const { data, isLoading, error, isError } = useQuery(
    getCardInfoQueryOptions(planId!)
  );
  if (isLoading) return <Loader className="animate-spin" />;
  if (isError) {
    toast.error("Изникна грешка: " + error.message);
    return <p>{error.message}</p>;
  }
  console.log(data);
  return <div>Карта</div>;
};
