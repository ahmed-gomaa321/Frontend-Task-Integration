import { getPrompts } from "@/lib/services/prompt.service";
import { Prompt } from "@/lib/types/prompt";
import { useQuery } from "@tanstack/react-query";

export default function usePrompts() {
  return useQuery<Prompt[], Error>({
    queryKey: ["prompts"],
    queryFn: getPrompts,
  });
}
