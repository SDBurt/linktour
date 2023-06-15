import React, { Dispatch, SetStateAction } from "react"
import { Project } from "@prisma/client"

import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface ProjectFormProps extends React.HTMLAttributes<HTMLFormElement> {
  project: Pick<Project, "name" | "description" | "image">
  setProject: Dispatch<
    SetStateAction<Pick<Project, "name" | "description" | "image">>
  >
}

export default function ProfileForm({
  project,
  setProject,
  className,
  ...props
}: ProjectFormProps) {
  return (
    <form className={cn(className, "grid gap-2")} {...props}>
      <Label className="pt-2">Name</Label>
      <Input
        placeholder="Your project's public name"
        value={project.name}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <Label className="pt-2">Description</Label>
      <Textarea
        placeholder="Your project's bio description"
        value={project.description ?? ""}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <Label className="pt-2">Image URL</Label>
      <Input
        placeholder="Your project's image url"
        value={project.image ?? ""}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, image: e.target.value }))
        }
      />
    </form>
  )
}
