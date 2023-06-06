"use client"

import React, { Suspense } from "react"
import { ChevronsUpDown } from "lucide-react"

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

import { Icon, names } from "./icons"

export function CommandList({ onClick, names }) {
  return (
    <Command>
      <CommandInput placeholder="Search icons..." />
      <CommandEmpty>No link found.</CommandEmpty>
      <CommandGroup className="max-h-96 overflow-y-auto">
        {names.map((name) => (
          <CommandItem key={name} onSelect={() => onClick(name)}>
            <div className="flex flex-row items-center justify-start space-x-4">
              <Icon name={name} />
              {name}
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  )
}

export function IconPopover({ onClick }) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<undefined | string>()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-max justify-between"
        >
          {selected ? (
            <div className="flex flex-row items-center justify-start space-x-2">
              <Icon name={selected} />
              <p>{selected}</p>
            </div>
          ) : (
            "Select Icon..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Suspense fallback={<div>Loading...</div>}>
          <CommandList
            names={names}
            onClick={(name) => {
              onClick()
              setSelected(name)
              setOpen(false)
            }}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
