import * as z from "zod"

import { verifyCurrentUserHasAccessToLink } from "@/lib/api/auth"
import { getLinkStats } from "@/lib/api/stats"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
    key: z.string(),
    endpoint: z.string(),
  }),
})

/**
 * Get Single Link for Project
 */
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    const { searchParams } = new URL(req.url)

    const interval = searchParams.get("interval")

    // console.log({params, searchParams})

    // Check if the user has access to this link.
    if (!(await verifyCurrentUserHasAccessToLink(params.slug, params.key))) {
      return new Response(null, { status: 403 })
    }

    const stats = await getLinkStats({
      slug: params.slug,
      key: params.key,
      endpoint: params.endpoint,
      ...(interval && { interval }),
    })

    if (stats === null) {
      return new Response(null, { status: 405 })
    }

    return new Response(JSON.stringify(stats))
  } catch (err) {
    console.log(err)
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
