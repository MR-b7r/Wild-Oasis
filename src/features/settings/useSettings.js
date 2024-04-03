import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    error,
    data: settings,
    isLoading,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  return { error, settings, isLoading };
}
