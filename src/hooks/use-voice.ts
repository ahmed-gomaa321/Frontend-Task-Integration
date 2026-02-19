import { getLanguages } from "@/lib/services/language.service";
import { getVoices } from "@/lib/services/voice.service";
import { Language } from "@/lib/types/language";
import { Voice } from "@/lib/types/voice";
import { useQuery } from "@tanstack/react-query";

export default function useVoices() {
  return useQuery<Voice[], Error>({
    queryKey: ["voices"],
    queryFn: () => getVoices(),
  });
}
