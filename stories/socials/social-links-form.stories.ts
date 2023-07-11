import type { Meta, StoryObj } from "@storybook/react"

import { SocialLinkForm } from "@/components/admin/social-links/social-link-form"

// import LinkEditForm from "@/components/admin/social/link-edit-form"

const meta: Meta<typeof SocialLinkForm> = {
  component: SocialLinkForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SocialLinkForm>

export const Default: Story = {
  args: {
    projectSlug: "sdburt",
  },
}
