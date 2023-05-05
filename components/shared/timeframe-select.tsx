"use client";

import React, { useCallback, useEffect, useMemo } from "react";

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
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const interval = searchParams?.get("interval");

  const [value, setValue] = React.useState<string>("24h");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const selectedInterval = useMemo(() => {
    return INTERVALS.find((s) => s.slug === interval) || INTERVALS[1];
  }, [interval]);

  const selectValueChangeHandler = (value: string) => {
    console.log(value);

    router.push(pathname + "?" + createQueryString("interval", value));

    setValue(value);
  };

  return (
    <div className="p-1">
      <Select value={value} onValueChange={(v) => selectValueChangeHandler(v)}>
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
