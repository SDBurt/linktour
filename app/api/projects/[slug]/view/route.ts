import { NextRequest } from "next/server"
import * as z from "zod"

import { IncrementViews } from "@/lib/api/projects"
import { recordClick } from "@/lib/tinybird"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
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
    console.log("/api/projects/<slug>/view")
    await recordClick(params.slug, req)

    // db total clicks
    const res = await IncrementViews(params.slug)

    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
