import * as z from "zod"

export const projectSchema = z.object({
  name: z.string().min(3).max(128).trim(),
  slug: z.string().min(3).max(128).trim(),
  description: z.string().min(3).max(255),
})
