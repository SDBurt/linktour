import { NextRequest } from "next/server"
import * as z from "zod"

import { IncrementClick } from "@/lib/api/links"
import { recordClick } from "@/lib/tinybird"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
    key: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // cookies, geo, ip
    // tinybird
    await recordClick(params.slug, req, params.key)

    // db total clicks
    const res = await IncrementClick(params.slug, params.key)

    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
