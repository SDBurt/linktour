import React from "react"
import { useParams, useRouter } from "next/navigation"
import { Link } from "@prisma/client"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LinkCreateButton } from "@/components/admin/link/link-create-button"

interface LinkDropdownNavProps extends React.HTMLAttributes<HTMLDivElement> {
  links: Pick<Link, "title" | "slug" | "key">[]
  currentLink?: Pick<Link, "title" | "slug" | "key">
}

export function LinkDropdownNav({ links, currentLink }: LinkDropdownNavProps) {
  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentLink ? currentLink?.title : "Select Link..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search links..." />
          <CommandEmpty>No link found.</CommandEmpty>
          <CommandGroup>
            {links.map((link) => (
              <CommandItem
                key={link.slug}
                onSelect={(currentValue) => {
                  setOpen(false)
                  router.push(`/admin/${link.slug}/${link.key}`)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentLink?.key === link.key ? "opacity-100" : "opacity-0"
                  )}
                />
                {link.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem>
              <LinkCreateButton className="font-normal" />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
