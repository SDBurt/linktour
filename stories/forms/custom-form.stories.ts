import type { Meta, StoryObj } from "@storybook/react"
import * as z from "zod"

import CustomForm from "@/components/shared/custom-form"

const meta: Meta<typeof CustomForm> = {
  component: CustomForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof CustomForm>

export const Default: Story = {
  args: {
    title: "Example Form",
    defaultValues: {
      title: "default value title",
      key: "",
      url: "",
      description: "",
    },
    isSaving: false,
    items: [
      {
        label: "Title",
        name: "title",
        placeholder: "Github",
        description: "The title of your link",
        type: "input",
      },
      {
        label: "Key",
        name: "key",
        placeholder: "link key (/project/<key>)",
        type: "input",
      },
      {
        label: "Url",
        name: "url",
        placeholder: "URL of your link",
        type: "input",
      },
      {
        label: "Description",
        name: "description",
        placeholder: "link description",
        type: "input",
      },
    ],
    schema: {
      title: z.string().max(128),
      key: z.string().trim().min(3),
      url: z.string().trim().url(),
      description: z.string().min(3).max(255).optional(),
    },
    submitHandler: async (body) => {
      return new Response("success")
    },
  },
}

export const IsSaving: Story = {
  args: {
    ...Default.args,
    isSaving: true,
  },
}
