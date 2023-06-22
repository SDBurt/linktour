import type { Meta, StoryObj } from "@storybook/react"

import LinkEditForm from "./link-edit-form"

const meta: Meta<typeof LinkEditForm> = {
  component: LinkEditForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof LinkEditForm>

export const Default: Story = {
  args: {
    title: "Github",
    url: "https://github.com/sdburt",
    linkKey: "github",
    slug: "sdburt",
    submitHandler: async (body) => {
      return new Response("success")
    },
  },
}
