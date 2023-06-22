import type { Meta, StoryObj } from "@storybook/react"

import Button from "./button"

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Button>

export const Fill: Story = {
  args: {
    buttonType: "FILL",
    backgroundColor: "#333333",
    borderColor: "#333333",
    textColor: "#eeeeee",
    children: <span>FILL</span>,
  },
}
export const FillRounded: Story = {
  args: {
    buttonType: "FILL_ROUNDED",
    backgroundColor: "#333333",
    borderColor: "#333333",
    textColor: "#eeeeee",
    children: <span>FILL ROUNDED</span>,
  },
}
export const FillCircular: Story = {
  args: {
    buttonType: "FILL_CIRCULAR",
    backgroundColor: "#333333",
    borderColor: "#333333",
    textColor: "#eeeeee",
    children: <span>FILL CIRCULAR</span>,
  },
}

export const Outline: Story = {
  args: {
    buttonType: "OUTLINE",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>OUTLINE</span>,
  },
}
export const OutlineRounded: Story = {
  args: {
    buttonType: "OUTLINE_ROUNDED",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>OUTLINE ROUNDED</span>,
  },
}
export const OutlineCircular: Story = {
  args: {
    buttonType: "OUTLINE_CIRCULAR",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>OUTLINE CIRCULAR</span>,
  },
}

export const SoftShadow: Story = {
  args: {
    buttonType: "SOFTSHADOW",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>SOFTSHADOW</span>,
  },
}
export const SoftShadowRounded: Story = {
  args: {
    buttonType: "SOFTSHADOW_ROUNDED",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>SOFTSHADOW ROUNDED</span>,
  },
}
export const SoftShadowCircular: Story = {
  args: {
    buttonType: "SOFTSHADOW_CIRCULAR",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>SOFTSHADOW CIRCULAR</span>,
  },
}

export const HardShadow: Story = {
  args: {
    buttonType: "HARDSHADOW",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>HARDSHADOW</span>,
  },
}

export const HardShadowRounded: Story = {
  args: {
    buttonType: "HARDSHADOW_ROUNDED",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>HARDSHADOW ROUNDED</span>,
  },
}

export const HardShadowCircular: Story = {
  args: {
    buttonType: "HARDSHADOW_CIRCULAR",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    textColor: "#333333",
    children: <span>HARDSHADOW CIRCULAR</span>,
  },
}
