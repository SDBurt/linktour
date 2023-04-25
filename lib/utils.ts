import { createClient } from "@vercel/edge-config";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { HOME_HOSTNAMES } from "./constants";

interface SWRError extends Error {
  status: number;
}

export const edgeConfig = createClient(
  `https://edge-config.vercel.com/ecfg_eh6zdvznm70adch6q0mqxshrt4ny?token=64aef40c-ea06-4aeb-b528-b94d924ec05a`
);

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const getDomainWithoutWWW = (url: string | null) => {
  if (!url) return null;
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, "");
  }
  try {
    if (url.includes(".") && !url.includes(" ")) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, "");
    }
  } catch (e) {
    return null;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app");
};

export const isReservedKey = async (key: string) => {
  let reservedKey;
  try {
    reservedKey = await edgeConfig.get("reserved");
  } catch (e) {
    reservedKey = [];
  }
  return new Set(reservedKey).has(key);
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as SWRError;
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
