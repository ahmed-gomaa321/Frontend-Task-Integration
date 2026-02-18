import { Voice } from "../types/voice";

export async function getVoices(): Promise<Voice[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/voices`);
  if (!res.ok) {
    throw new Error("Failed to fetch voices");
  }
  return res.json();
}
