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
export const projectPatchSchema = z.object({
  name: z.string().min(3).max(128),
  slug: z.string().min(3).max(128),
  domain: z.string().min(3).max(128),
});
