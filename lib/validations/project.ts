import * as z from "zod";

/*
  id
  name
  slug
  domain
  verified
  createdAt
  updatedAt
  userId
*/
export const projectCreateSchema = z.object({
  name: z.string().min(3).max(128).trim(),
  slug: z.string().min(3).max(128).trim(),
  domain: z.string().min(3).max(128).trim(),
});

export const projectEditSchema = z.object({
  name: z.string().min(3).max(128).trim(),
});
