import { createAgent, updateAgent } from "@/lib/services/agents.service";
import { Agent, CreateAgentRequest } from "@/lib/types/agent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpsertAgent(
  agentId: string | null,
  setAgentId: (id: string) => void,
) {
  return useMutation<Agent, Error, CreateAgentRequest>({
    mutationFn: async (data) => {
      if (agentId) {
        return updateAgent(agentId, data);
      }
      return createAgent(data);
    },
    onSuccess: (data) => {
      toast.success("Agent saved successfully", { duration: 2000 });

      if (!agentId) {
        setAgentId(data.id);
      }
    },
  });
}
