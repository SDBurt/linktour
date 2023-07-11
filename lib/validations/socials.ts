import * as z from "zod"

export const socialsCreateSchema = z.object({
  url: z.string().trim().url(),
  type: z.string().trim(),
})

export const socialsEditSchema = z.object({
  url: z.string().trim().url(),
  type: z.string().trim(),
  active: z.boolean().optional(),
  order: z.number().optional(),
})

export const socialsReorderSchema = z.object({
  id: z.string(),
  order: z.number(),
})
