import * as z from "zod"

import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth"
import { getProjectTheme } from "@/lib/api/projects"
import { db } from "@/lib/db"
import { themeEditSchema } from "@/lib/validations/theme"

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
    const theme = await getProjectTheme(params.slug)

    return new Response(JSON.stringify(theme), { status: 200 })
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
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = themeEditSchema.parse(json)

    // Create the theme.
    // TODO: Implement sanitization for content.
    await db.theme.create({
      data: {
        projectSlug: params.slug,
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
    const body = themeEditSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.theme.update({
      where: {
        projectSlug: params.slug,
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
