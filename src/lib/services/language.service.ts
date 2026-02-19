import { Language } from "../types/language";

export async function getLanguages(): Promise<Language[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/languages`);
  if (!res.ok) {
    throw new Error("Failed to fetch languages");
  }
  return res.json();
}
