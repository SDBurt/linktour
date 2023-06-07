"use client"

import React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import IconCommandList from "./icon-command-list"
import Icon, { names } from "./icons"

export function IconPopover({ onClick }) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<undefined | string>()

  function clickHandler(name) {
    onClick(name)
    setSelected(name)
    setOpen(false)
  }

  return (
    <div className="flex items-center space-x-2">
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
          <IconCommandList
            names={names}
            onClick={(name) => clickHandler(name)}
          />
        </PopoverContent>
      </Popover>
      <Button variant="secondary" onClick={() => setSelected(undefined)}>
        Remove Icon
      </Button>
    </div>
  )
}
