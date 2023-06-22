import type { Meta, StoryObj } from "@storybook/react"

import Preview from "./preview"

// import { Default } from '@/components/shared/bio/project-bio.stories';

const meta: Meta<typeof Preview> = {
  component: Preview,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Preview>

export const Default: Story = {}
