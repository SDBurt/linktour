import type { Meta, StoryObj } from "@storybook/react"

import BioBanner from "./bio-banner"

const project = {
  name: "Morty Smith",
  description: "The titular central protagonist of Rick and Morty",
  image:
    "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png",
}

const meta: Meta<typeof BioBanner> = {
  component: BioBanner,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof BioBanner>

export const Default: Story = {
  args: {
    name: "Morty Smith",
    description: "The titular central protagonist of Rick and Morty",
    imageUrl:
      "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png",
    imageName: "Morty Smith",
    theme: {
      typefaceColor: "333333",
    },
  },
}
