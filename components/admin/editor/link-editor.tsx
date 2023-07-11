"use client"

import React, { useState } from "react"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project, SocialLink } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import ProjectPreview from "@/components/shared/bio/project-preview"

import { LinkList } from "../link/link-list"

interface LinkEditorProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: Pick<SocialLink, "id" | "type" | "order" | "url" | "active">[]
  project: Pick<Project, "name" | "image" | "description" | "slug">
  theme: ThemeProps
  links: Pick<
    Link,
    | "id"
    | "title"
    | "slug"
    | "key"
    | "order"
    | "createdAt"
    | "url"
    | "clicks"
    | "thumbnail"
    | "thumbnailType"
  >[]
}

export default function LinkEditor({
  user,
  socials,
  project,
  theme,
  links,
}: LinkEditorProps) {
  const [linkItems, setLinkItems] = useState(links)

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-2">
        <LinkList
          links={linkItems}
          slug={project.slug}
          setLinks={setLinkItems}
        />
      </div>
      <div className="col-span-4 hidden justify-center p-4 lg:col-span-2 lg:flex">
        <ProjectPreview
          theme={theme}
          socials={socials}
          project={project}
          links={linkItems}
          user={{ username: user.username, imageUrl: user.imageUrl }}
        />
      </div>
    </div>
  )
}
