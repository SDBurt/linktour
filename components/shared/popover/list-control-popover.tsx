"use client"

import React, { useState } from "react"

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

export type ControlPopoverItem = {
  label: string
  name: string
  icon: React.ReactNode
  action: () => void
}

interface GripPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  options: ControlPopoverItem[]
}

export function GripPopover({ options }: GripPopoverProps) {
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
            {options.map((option: ControlPopoverItem) => (
              <CommandItem key={option.name}>
                <div
                  className="flex items-center space-x-4"
                  onClick={() => {
                    option.action()
                    setOpen(false)
                  }}
                >
                  {option.icon}
                  <p>{option.label}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
