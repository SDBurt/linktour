import React from "react"
import { useParams, useRouter } from "next/navigation"
import { Project } from "@prisma/client"
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

import { ProjectCreateButton } from "../project/project-create-button"

interface ProjectDropdownNavProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Pick<Project, "name" | "slug">[]
}

export function ProjectDropdownNav({ projects }: ProjectDropdownNavProps) {
  const [open, setOpen] = React.useState(false)

  const router = useRouter()
  const params = useParams()
  const currentProject = projects?.find((p) => p.slug === params?.slug)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentProject ? currentProject?.name : "Select Project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <CommandItem
                key={project.slug}
                onSelect={(currentValue) => {
                  setOpen(false)
                  router.push(`/admin/${project.slug}`)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentProject?.slug === project.slug
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem>
              <ProjectCreateButton className="font-normal" />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
