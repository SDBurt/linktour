import * as z from "zod"

export const linkPatchSchema = z.object({
  title: z.string().max(128),
  url: z.string().trim().url(),
  key: z.string().trim().min(3),
  description: z.string().min(3).max(255).optional(),
})

export const linkCreateSchema = z.object({
  title: z.string().max(128),
  url: z.string().trim().url(),
  key: z.string().trim().min(3),
  description: z.string().min(3).max(255).optional(),
})

export const linkSchema = z.object({
  title: z.string().max(128),
  url: z.string().trim().url(),
  description: z.string().min(3).max(255).optional(),
})
