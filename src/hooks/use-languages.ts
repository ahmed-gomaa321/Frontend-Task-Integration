import { getLanguages } from "@/lib/services/language.service";
import { Language } from "@/lib/types/language";
import { useQuery } from "@tanstack/react-query";

export default function useLanguages() {
  return useQuery<Language[], Error>({
    queryKey: ["languages"],
    queryFn: () => getLanguages(),
  });
}
