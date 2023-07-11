"use client"

import * as React from "react"
import * as z from "zod"

import CustomForm from "@/components/shared/custom-form"

interface socialLinkFormProps extends React.HTMLAttributes<HTMLFormElement> {
  type: string
  projectSlug: string
}

const socialLinkSchema = {
  url: z.string().trim().url(),
}

const socialLinkDefaultValues = {
  url: "",
}

export function SocialLinkForm({
  type,
  projectSlug,
  className,
  ...props
}: socialLinkFormProps) {
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data) {
    setIsSaving(true)

    const response = await fetch(`/api/projects/${projectSlug}/socials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: data.url,
        type,
      }),
    })

    setIsSaving(false)

    return response
  }

  const socialLinkItems = [
    {
      label: "URL",
      name: "url",
      placeholder: `${type} URL`,
    },
  ]

  return (
    <CustomForm
      className={className}
      title={"Social Link Details"}
      items={socialLinkItems}
      defaultValues={socialLinkDefaultValues}
      schema={socialLinkSchema}
      isSaving={isSaving}
      submitHandler={(body) => onSubmit(body)}
      {...props}
    />
  )
}
