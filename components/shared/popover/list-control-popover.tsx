"use client"

import { useState } from "react"
import { IconNode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/shared/icons"

const testData = {
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "The example of text that was written in <b>one of popular</b> text editors.",
      },
    },
    {
      type: "header",
      data: {
        text: "With the header of course",
        level: 2,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "So what do we have?",
      },
    },
  ],
}

type ControlPopoverItem = {
  label: string
  name: string
  icon: IconNode
  action: (item) => void
  type: string
  data: { [key: string]: any }
}

interface GripPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ControlPopoverItem[]
}

export function GripPopover({ items }: GripPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="p-1"
          variant="ghost"
          role="combobox"
          aria-expanded={open}
        >
          <Icons.grip className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => {
                  item.action(item)
                }}
              >
                {item.icon}
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
