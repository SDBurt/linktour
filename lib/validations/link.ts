import * as z from "zod";

/*
  id
  title
  domain
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
  title: z.string().min(3).max(128).optional(),
  url: z.string().trim().url(),
  key: z.string().trim().url(),
  description: z.string().min(3).max(255).optional(),
});
