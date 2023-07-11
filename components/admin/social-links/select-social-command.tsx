"use client"

import { Check } from "lucide-react"

import { socialItemType } from "@/config/marketing"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

interface SocialSelectorProps {
  inputPlaceholder: string
  emptyPlaceholder: string
  items: socialItemType[]
  current: string
  setCurrent: any
}

export default function SocialSelector({
  inputPlaceholder,
  emptyPlaceholder,
  items,
  current,
  setCurrent,
}: SocialSelectorProps) {
  return (
    <Command>
      <CommandInput placeholder={inputPlaceholder} />
      <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
      <CommandGroup>
        {items.map((item) => (
          <CommandItem key={item.name} onSelect={() => setCurrent(item.name)}>
            <div className="flex cursor-pointer flex-row items-center space-x-4">
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  item.name === current ? "opacity-100" : "opacity-0"
                )}
              />
              <item.icon className="mr-2 h-4 w-4" />
              <p>{item.label}</p>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  )
}
