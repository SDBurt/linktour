import { auth } from "@clerk/nextjs"
import * as z from "zod"

import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth"
import { getLinksForProject } from "@/lib/api/links"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { linkCreateSchema } from "@/lib/validations/link"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

/**
 * Get Links for Project
 */
export async function GET(
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

    const links = await getLinksForProject(params.slug)

    return new Response(JSON.stringify(links))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function POST(
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

    // Session exists if it reaches this point
    const { userId } = (await auth()) as { userId: string }

    // Currently don't limit link count
    // const subscriptionPlan = await getUserSubscriptionPlan(userId)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 projects.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await countLinksForProject(params.slug)

    //   if (count >= freePlanValues.project.count) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = linkCreateSchema.parse(json)

    const link = await db.link.create({
      data: {
        userId: userId as string,
        slug: params.slug,
        ...body,
      },
      select: {
        id: true,
        slug: true,
        key: true,
        title: true,
        url: true,
      },
    })

    return new Response(JSON.stringify(link))
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
