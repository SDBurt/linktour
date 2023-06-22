import React from "react"

import SocialItem, { BioSocialItem } from "./social-item"

interface BioSocialsProps {
  socials: BioSocialItem[]
}

export default function BioSocials({ socials }: BioSocialsProps) {
  return (
    <div>
      {socials && socials.length > 0 && (
        <div className="flex items-center justify-center space-x-1">
          {socials.map((social, index) => {
            if (social.url.trim().length === 0) {
              return null
            }
            return <SocialItem key={`${social}-${index}`} {...social} />
          })}
        </div>
      )}
    </div>
  )
}
