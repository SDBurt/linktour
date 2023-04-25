import * as z from "zod";

/*
  id
  title
  key
  url
  description
  clicks
  public
  publicStats
  userId
  createdAt
  updatedAt
*/
export const linkPatchSchema = z.object({
  title: z.string().max(128).optional(),
  url: z.string().trim().url(),
  key: z.string().trim().min(3),
  description: z.string().min(3).max(255).optional(),
});
