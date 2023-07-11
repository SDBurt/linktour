import type { Meta, StoryObj } from "@storybook/react"

import { AddSocialButton } from "@/components/admin/social-links/add-social-button"

const meta: Meta<typeof AddSocialButton> = {
  component: AddSocialButton,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AddSocialButton>

export const Default: Story = {
  args: {},
}
