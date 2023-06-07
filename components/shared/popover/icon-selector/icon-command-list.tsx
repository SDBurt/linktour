import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import { Icon } from "./icons"

export default function IconCommandList({ onClick, names }) {
  return (
    <Command>
      <CommandInput placeholder="Search icons..." />
      <CommandEmpty>No link found.</CommandEmpty>
      <CommandGroup className="max-h-96 overflow-y-auto">
        {names
          ? names.map((name) => (
              <CommandItem key={name} onSelect={() => onClick(name)}>
                <div className="flex flex-row items-center justify-start space-x-4">
                  <Icon name={name} />
                  {name}
                </div>
              </CommandItem>
            ))
          : null}
      </CommandGroup>
    </Command>
  )
}
