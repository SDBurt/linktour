import React, { Dispatch, SetStateAction } from "react"

import { socialsOptions, type socialItemType } from "@/config/marketing"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"

interface SocialsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  socials: { [key: string]: string }
  setSocials: Dispatch<SetStateAction<{ [key: string]: string }>>
}
export default function SocialsForm({
  socials,
  setSocials,
  className,
  ...props
}: SocialsFormProps) {
  return (
    <form {...props} className={cn(className)}>
      <div className="grid grid-cols-2 gap-4">
        {socialsOptions.map((social: socialItemType, index: number) => {
          return (
            <div
              key={`${social.name}-${index}`}
              className="flex flex-row items-center space-x-2"
            >
              <social.icon />
              <Input
                placeholder={`${social.label} link`}
                value={socials[social.name]}
                onChange={(e) =>
                  setSocials((prev) => ({
                    ...prev,
                    [social.name]: e.target.value,
                  }))
                }
              />
            </div>
          )
        })}
      </div>
    </form>
  )
}
