"use client";

import React, { useCallback } from "react";

import { INTERVALS } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TimeframeSelect() {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const interval = searchParams?.get("interval") || "24h";

  // const [value, setValue] = React.useState<string>(interval);

  console.log(interval);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams || {});
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const selectedInterval = useCallback(() => {
    return INTERVALS.find((s) => s.slug === interval) || INTERVALS[1];
  }, [interval]);

  const selectValueChangeHandler = useCallback(
    (value: string) => {
      console.log("selectValueChangeHandler", value);

      router.push(pathname + "?" + createQueryString("interval", value));

      // setValue(value);
    },
    [interval]
  );

  return (
    <div className="p-1">
      <Select
        value={selectedInterval().slug}
        onValueChange={(v) => selectValueChangeHandler(v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {INTERVALS.map(({ display, slug }) => {
            return (
              <SelectItem key={slug} value={slug}>
                {display}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
