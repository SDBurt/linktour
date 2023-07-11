import React from "react"

import SocialItem, { BioSocialItem } from "./social-item"

interface BioSocialsProps {
  socials: BioSocialItem[]
  color: string
}

export default function BioSocials({ socials, color }: BioSocialsProps) {
  return (
    <div>
      {socials && socials.length > 0 && (
        <div className="flex items-center justify-center space-x-1">
          {socials.map((social, index) => {
            if (social.url.trim().length === 0) {
              return null
            }
            return (
              <SocialItem
                key={`${social}-${index}`}
                color={color}
                {...social}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
