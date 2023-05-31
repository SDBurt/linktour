import * as z from "zod"

export const themeEditSchema = z.object({
  key: z.string(),
  luminance: z.string(),
  socialStyleColor: z.string(),
  backgroundColor: z.string(),
  backgroundStyle: z.string(),
  backgroundType: z.string(),
  gradientColor: z.string(),
  buttonBackgroundColor: z.string(),
  buttonShadowColor: z.string(),
  buttonTextColor: z.string(),
  buttonType: z.string(),
  typefaceColor: z.string(),
  typefaceFamily: z.string(),
})
