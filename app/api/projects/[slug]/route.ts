import * as z from "zod"

import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth"
import { getProject } from "@/lib/api/projects"
import { db } from "@/lib/db"
import { projectPatchSchema } from "@/lib/validations/project"

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
})

export async function GET(
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

    // Get the project.
    const project = await getProject(params.slug)

    return new Response(JSON.stringify(project), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

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

    // Delete the project.
    await db.project.delete({
      where: {
        slug: params.slug as string,
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    console.log(json)
    const body = projectPatchSchema.parse(json)

    console.log(body)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.project.update({
      where: {
        slug: params.slug,
      },
      data: {
        ...body,
      },
    })

    return new Response(null, { status: 200 })
  } catch (err) {
    console.error(err)
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
