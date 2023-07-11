import type { Meta, StoryObj } from "@storybook/react"

import AddSocialProcess from "@/components/admin/social-links/add-social-process"

const meta: Meta<typeof AddSocialProcess> = {
  component: AddSocialProcess,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AddSocialProcess>

export const Default: Story = {
  args: { slug: "sdburt" },
}
