import { createClient } from "@vercel/edge-config";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { HOME_HOSTNAMES } from "./constants";

export const edgeConfig = createClient(
  `https://edge-config.vercel.com/ecfg_eh6zdvznm70adch6q0mqxshrt4ny?token=64aef40c-ea06-4aeb-b528-b94d924ec05a`
);

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
