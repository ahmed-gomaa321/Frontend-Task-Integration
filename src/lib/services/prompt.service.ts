import { Prompt } from "../types/prompt";

export async function getPrompts(): Promise<Prompt[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/prompts`);
  if (!res.ok) {
    throw new Error("Failed to fetch prompts");
  }
  return res.json();
}
