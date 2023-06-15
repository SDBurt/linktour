import * as z from "zod"

export const socialsSchema = z.object({
  title: z.string().max(128),
  url: z.string().trim().url(),
})
