"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { subMonths } from "date-fns";
import { DateRange } from "react-day-picker";

import { Calendar } from "../ui/calendar";

// interface CalendarPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
//   projects: Pick<Project, "name" | "slug">[];
// }
const dateNow = new Date(Date.now());
const previousMonth = new Date(dateNow.setDate(0));

export function CalendarPopover() {
  const [open, setOpen] = React.useState(false);

  // const params = useParams();
  // const currentProject = projects?.find((p) => p.slug === params?.slug);
  const defaultSelected: DateRange = {
    from: subMonths(dateNow, 1),
    to: dateNow,
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-max justify-between"
        >
          {range
            ? `${range.from?.toLocaleDateString()} - ${range.to?.toLocaleDateString()}`
            : "Select Project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          id="rangeCalendar"
          mode="range"
          defaultMonth={previousMonth}
          selected={range}
          onSelect={setRange}
        />
      </PopoverContent>
    </Popover>
  );
}
