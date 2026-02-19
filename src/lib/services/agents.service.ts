import { CreateAgentRequest, Agent } from "@/lib/types/agent";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// create agent
export async function createAgent(data: CreateAgentRequest): Promise<Agent> {
  const res = await fetch(`${BASE_URL}/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create agent");
  }

  return res.json();
}

// update agent
export async function updateAgent(
  id: string,
  data: CreateAgentRequest,
): Promise<Agent> {
  const res = await fetch(`${BASE_URL}/agents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update agent");
  }

  return res.json();
}
