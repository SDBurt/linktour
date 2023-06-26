import type { Meta, StoryObj } from "@storybook/react"

import ButtonList from "@/components/shared/bio/buttons/button-list"

const meta: Meta<typeof ButtonList> = {
  component: ButtonList,
  tags: ["autodocs"],
}

const links = [
  {
    title: "Example 1",
    key: "ex1",
    url: "/",
    slug: "ex1",
  },
  {
    title: "Example 2",
    key: "ex2",
    url: "/",
    slug: "ex2",
  },
  {
    title: "Example 3",
    key: "ex3",
    url: "/",
    slug: "ex3",
  },
]

export default meta
type Story = StoryObj<typeof ButtonList>

export const Fill: Story = {
  args: {
    links,
    registerClick: false,
    buttonType: "FILL",
    buttonBackgroundColor: "#333333",
    buttonBorderColor: "#333333",
    buttonTextColor: "#eeeeee",
  },
}

export const FillRounded: Story = {
  args: {
    ...Fill.args,
    buttonType: "FILL_ROUNDED",
  },
}
export const FillCircular: Story = {
  args: {
    ...Fill.args,
    buttonType: "FILL_CIRCULAR",
  },
}

export const Outline: Story = {
  args: {
    links,
    registerClick: false,
    buttonType: "OUTLINE",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
    buttonTextColor: "#333333",
  },
}
export const OutlineRounded: Story = {
  args: {
    ...Outline.args,
    buttonType: "OUTLINE_ROUNDED",
  },
}
export const OutlineCircular: Story = {
  args: {
    ...Outline.args,
    buttonType: "OUTLINE_CIRCULAR",
  },
}

export const SoftShadow: Story = {
  args: {
    links,
    registerClick: false,
    buttonType: "SOFTSHADOW",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
    buttonTextColor: "#333333",
  },
}
export const SoftShadowRounded: Story = {
  args: {
    ...SoftShadow.args,
    buttonType: "SOFTSHADOW_ROUNDED",
  },
}
export const SoftShadowCircular: Story = {
  args: {
    ...SoftShadow.args,
    buttonType: "SOFTSHADOW_CIRCULAR",
  },
}

export const HardShadow: Story = {
  args: {
    links,
    registerClick: false,
    buttonType: "HARDSHADOW",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
    buttonTextColor: "#333333",
  },
}

export const HardShadowRounded: Story = {
  args: {
    ...HardShadow.args,
    buttonType: "HARDSHADOW_ROUNDED",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
    buttonTextColor: "#333333",
  },
}

export const HardShadowCircular: Story = {
  args: {
    ...HardShadow.args,
    buttonType: "HARDSHADOW_CIRCULAR",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
    buttonTextColor: "#333333",
  },
}

export const Empty: Story = {
  args: {
    links: [],
    registerClick: false,
    buttonType: "FILL",
    buttonBackgroundColor: "#333333",
    buttonBorderColor: "#333333",
    buttonTextColor: "#eeeeee",
  },
}
