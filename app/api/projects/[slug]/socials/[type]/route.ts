import * as z from "zod"

import {
  verifyCurrentUserHasAccessToLink,
  verifyCurrentUserHasAccessToProject,
} from "@/lib/api/auth"
import { getRandomKey } from "@/lib/api/links"
import { db } from "@/lib/db"
import { linkPatchSchema } from "@/lib/validations/link"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
    type: z.string(),
  }),
})

/**
 * Get a social links details
 */
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this link.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    const key = await getRandomKey(params.slug)

    return new Response(JSON.stringify(key))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

/**
 * Update a social link
 */
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this link.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = linkPatchSchema.parse(json)

    // Update the link.
    // TODO: Implement sanitization for content.
    await db.socialLink.update({
      where: {
        slug_type: {
          slug: params.slug,
          type: params.type,
        },
      },
      data: {
        ...body,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

/**
 * Delete a social link
 */
export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    // Delete the link.
    await db.socialLink.delete({
      where: {
        slug_type: {
          slug: params.slug,
          type: params.type,
        },
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
