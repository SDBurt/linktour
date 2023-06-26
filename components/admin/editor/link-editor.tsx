"use client"

import React, { useState } from "react"
import { User } from "@clerk/nextjs/dist/types/server"
import { Link, Project } from "@prisma/client"

import { ThemeProps } from "@/lib/types"
import ProjectPreview from "@/components/shared/bio/project-preview"
import { BioSocialItem } from "@/components/shared/bio/socials/social-item"

import { LinkList } from "../link/link-list"

interface LinkEditorProps {
  user: Pick<User, "imageUrl" | "username">
  socials?: BioSocialItem[]
  project: Pick<Project, "name" | "image" | "description" | "slug">
  theme: ThemeProps
  links: Pick<Link, "title" | "url" | "slug" | "key">[]
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
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 flex justify-center p-4 lg:col-span-1">
        <ProjectPreview
          theme={theme}
          socials={socials}
          project={project}
          links={linkItems}
          user={{ username: user.username, imageUrl: user.imageUrl }}
        />
      </div>
      <div className="col-span-3 lg:-order-1 lg:col-span-2">
        <LinkList
          links={linkItems}
          slug={project.slug}
          setLinks={setLinkItems}
        />
      </div>
    </div>
  )
}
