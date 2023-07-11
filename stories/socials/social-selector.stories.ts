import type { Meta, StoryObj } from "@storybook/react"

import { supportedSocials } from "@/config/socials"
import SelectSocialCommand from "@/components/admin/social-links/select-social-command"

const meta: Meta<typeof SelectSocialCommand> = {
  component: SelectSocialCommand,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SelectSocialCommand>

export const Default: Story = {
  args: {
    inputPlaceholder: "Input your social",
    emptyPlaceholder: "No socials available",
    items: supportedSocials,
    current: "",
    setCurrent: (value) => console.log(value),
  },
}

export const LinkedinSelected: Story = {
  args: {
    inputPlaceholder: "Input your social",
    emptyPlaceholder: "No socials available",
    items: supportedSocials,
    current: "linkedin",
    setCurrent: (value) => console.log(value),
  },
}
