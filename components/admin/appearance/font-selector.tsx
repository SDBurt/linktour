"use client"

import { useState } from "react"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent } from "@/components/ui/popover"

type FontItemType = { label: string; name: string }

interface FontSelectorProps {
  fonts: FontItemType[]
  currentFont: string
  setCurrentFont: any
}

export default function FontSelector({
  fonts,
  currentFont,
  setCurrentFont,
}: FontSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentFont
            ? fonts.find((f) => f.name == currentFont)?.label
            : "Select Font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandEmpty>No fonts found.</CommandEmpty>
          <CommandGroup>
            {fonts.map((font) => (
              <CommandItem
                key={font.name}
                onSelect={(currentValue) => {
                  setOpen(false)
                  setCurrentFont(currentValue)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    fonts.find((f) => f.name == currentFont)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {font.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
