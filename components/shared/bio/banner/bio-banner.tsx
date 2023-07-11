import React from "react"

import { UserAvatar } from "@/components/user/user-avatar"

interface BioBannerProps {
  name: string
  description?: string | null
  imageName?: string | null
  imageUrl: string
  theme: {
    typefaceColor: string
  }
}

export default function BioBanner({
  name,
  description,
  imageUrl,
  imageName,
  theme: { typefaceColor },
}: BioBannerProps) {
  return (
    <div>
      <div className="mb-2 flex w-full items-center justify-center">
        <UserAvatar
          className="h-24 w-24 ring-1 ring-muted"
          user={{ username: imageName || null, imageUrl: imageUrl }}
        />
      </div>
      <div
        className="w-full text-center"
        style={{
          color: typefaceColor,
        }}
      >
        <h2 className="pb-2 text-xl font-bold">{name}</h2>
        {description && <p className="font-primary">{description}</p>}
      </div>
    </div>
  )
}
