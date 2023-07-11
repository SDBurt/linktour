import * as z from "zod"

import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    const body = await req.json()

    const promises = body.map((orderItem) => {
      return db.socialLink.update({
        where: {
          id: orderItem.id,
        },
        data: {
          order: orderItem.order,
        },
      })
    })

    await Promise.allSettled(promises)
    return new Response(JSON.stringify("success"))
  } catch (err) {
    console.error(err)
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }

    if (err instanceof RequiresProPlanError) {
      return new Response(JSON.stringify({ message: "Requires Pro Plan" }), {
        status: 402,
      })
    }

    return new Response(null, { status: 500 })
  }
}
