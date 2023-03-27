import * as z from "zod";

export const shortLinkPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  destinationUrl: z.string().trim().url(),
  shortUrl: z.string().trim().url(),
});
