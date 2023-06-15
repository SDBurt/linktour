import React, { Dispatch, SetStateAction } from "react"
import NextLink from "next/link"
import { Link, Project } from "@prisma/client"

import {
  demoDefaultLinks,
  demoDefaultProject,
  demoDefaultSocials,
  demoDefaultTheme,
  demoPopulatedLinks,
  demoPopulatedProject,
  demoPopulatedSocials,
  demoPopulatedTheme,
} from "@/config/marketing"
import { ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import AppearanceForm from "@/components/demo/appearance-form"
import LinkForm from "@/components/demo/link-form"
import ProfileForm from "@/components/demo/profile-form"
import SocialForm from "@/components/demo/social-form"
import { Icons } from "@/components/shared/icons"

interface SectionsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

interface LeftContentProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: { [key: string]: string }
  setSocials: Dispatch<SetStateAction<{ [key: string]: string }>>
  links: Pick<Link, "title" | "url">[]
  setLinks: Dispatch<SetStateAction<Pick<Link, "title" | "url">[]>>
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
  project: Pick<Project, "name" | "image" | "description">
  setProject: Dispatch<
    SetStateAction<Pick<Project, "name" | "image" | "description">>
  >
}

function SectionsContainer({ className, children }: SectionsContainerProps) {
  return (
    <div
      className={cn(
        "h-screen flex-1 space-y-4 overflow-y-auto bg-muted p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

function Section({ title, subtitle, className, children }: SectionProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-3 gap-4 rounded-lg border bg-background p-8",
        className
      )}
    >
      <div className="col-span-1">
        {title && (
          <h2 className="font-heading text-xl leading-[1.1]">{title}</h2>
        )}
        {subtitle && (
          <p className="leading-normal text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="col-span-2">{children}</div>
    </section>
  )
}

function LeftContent({
  socials,
  setSocials,
  project,
  setProject,
  theme,
  setTheme,
  links,
  setLinks,
  className,
}: LeftContentProps) {
  const clearButtonClickedHandler = () => {
    setSocials(demoDefaultSocials)
    setProject(demoDefaultProject)
    setTheme(demoDefaultTheme)
    setLinks(demoDefaultLinks)
  }

  const demoDataClickedHandler = () => {
    setSocials(demoPopulatedSocials)
    setProject(demoPopulatedProject)
    setTheme(demoPopulatedTheme)
    setLinks(demoPopulatedLinks)
  }

  return (
    <SectionsContainer className={className}>
      {/* Info */}
      <div className="flex flex-row justify-between rounded-lg border bg-background p-8">
        {/* Back button */}
        <NextLink
          className={cn(
            "flex flex-row items-center justify-center",
            buttonVariants({ variant: "outline" })
          )}
          href="/"
        >
          <Icons.chevronLeft />
          Back
        </NextLink>

        <div className="flex flex-row space-x-1">
          {/* Use demo data */}
          <Button variant="default" onClick={() => demoDataClickedHandler()}>
            Use Demo Data
          </Button>
          {/* Clear data */}
          <Button variant="outline" onClick={() => clearButtonClickedHandler()}>
            Clear
          </Button>
        </div>
      </div>

      {/* Profile */}
      <Section title={"Profile"} subtitle={"Some public information about you"}>
        <ProfileForm project={project} setProject={setProject} />
      </Section>

      {/* Social Icons */}
      <Section title={"Socials"} subtitle={"Add your social media links"}>
        <SocialForm socials={socials} setSocials={setSocials} />
      </Section>

      {/* Links */}
      <Section title={"Links"} subtitle={"Add your links here"}>
        <LinkForm links={links} setLinks={setLinks} />
      </Section>

      {/* Appearance */}
      <Section title={"Appearance"} subtitle={"Change how your page looks"}>
        <AppearanceForm theme={theme} setTheme={setTheme} />
      </Section>

      {/* Info */}
      <div className="flex flex-row justify-end rounded-lg border bg-background p-8">
        <div className="flex flex-row items-center space-x-3">
          <h2 className="font-semibold text-primary">Like what you see?</h2>
          <NextLink href="/register" className={cn(buttonVariants())}>
            Get Started
          </NextLink>
        </div>
      </div>
    </SectionsContainer>
  )
}

export default LeftContent
