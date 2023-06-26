import type { Meta, StoryObj } from "@storybook/react"

import PreviewButton from "@/components/admin/appearance/preview-button"

const meta: Meta<typeof PreviewButton> = {
  component: PreviewButton,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PreviewButton>

export const Default: Story = {
  args: {
    buttonType: "FILL",
    buttonBackgroundColor: "#333333",
    buttonBorderColor: "#333333",
    buttonTextColor: "#eeeeee",
    children: "Default",
  },
}
export const NotActive: Story = {
  args: {
    active: false,
    buttonType: "FILL_ROUNDED",
    buttonBackgroundColor: "#333333",
    buttonBorderColor: "#333333",
    buttonTextColor: "#eeeeee",
    children: "NotActive",
  },
}
export const Active: Story = {
  args: {
    active: true,
    buttonType: "FILL_CIRCULAR",
    buttonBackgroundColor: "#333333",
    buttonBorderColor: "#333333",
    buttonTextColor: "#eeeeee",
    children: "Active",
  },
}
