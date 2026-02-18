import { Model } from "../types/model";

export async function getModels(): Promise<Model[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/models`);
  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }
  return res.json();
}
