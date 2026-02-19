import { useQuery } from "@tanstack/react-query";
import { Model } from "@/lib/types/model";
import { getModels } from "@/lib/services/model.service";

export default function useModels() {
  return useQuery<Model[], Error>({
    queryKey: ["models"],
    queryFn: getModels,
  });
}
