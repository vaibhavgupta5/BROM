import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);

    if (!url.startsWith("https://")) return false;

    const domainPattern = /\.(com|org|net|in|io|app|co|dev|ai|info|me|xyz)$/i;

    if (!domainPattern.test(parsed.hostname)) return false;

    return true;
  } catch {
    return false;
  }
}
