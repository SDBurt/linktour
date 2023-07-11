import { auth } from "@clerk/nextjs"
import * as z from "zod"

import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth"
import { db } from "@/lib/db"
import { getSocialsForProject } from "@/lib/socialLinks/actions"
import { socialsCreateSchema } from "@/lib/validations/socials"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

/**
 * Get all social links for Project
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

    const socials = await getSocialsForProject(params.slug)

    return new Response(JSON.stringify(socials))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

/**
 * Create a new social link
 */
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

    const json = await req.json()
    console.log(json)
    const body = socialsCreateSchema.parse(json)

    const socialLink = await db.socialLink.create({
      data: {
        userId: userId as string,
        slug: params.slug,
        ...body,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(socialLink))
  } catch (err) {
    console.error(err)
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
