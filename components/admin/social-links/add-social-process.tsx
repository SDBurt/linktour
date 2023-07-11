"use client"

import React, { useState } from "react"

import { supportedSocials } from "@/config/socials"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

import SelectSocialCommand from "./select-social-command"
import { SocialLinkForm } from "./social-link-form"

interface AddSocialProcessProps {
  slug: string
}

function AddSocialProcess({ slug }: AddSocialProcessProps) {
  const [stage, setStage] = useState<"select" | "input">("select")
  const [currentSocial, setCurrentSocial] = useState("")

  return (
    <div className="p-4">
      {stage === "select" && (
        <div className="flex flex-col space-y-2">
          <SelectSocialCommand
            inputPlaceholder={"Input your social"}
            emptyPlaceholder={"No socials available"}
            items={supportedSocials}
            current={currentSocial}
            setCurrent={(value) => {
              setCurrentSocial(value)
              setStage("input")
            }}
          />
        </div>
      )}
      {stage === "input" && (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start">
            <Button variant="secondary" onClick={() => setStage("select")}>
              <Icons.chevronLeft />
              Back
            </Button>
          </div>
          <SocialLinkForm type={currentSocial} projectSlug={slug} />
        </div>
      )}
    </div>
  )
}

export default AddSocialProcess
