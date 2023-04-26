import * as z from "zod";

import { db } from "@/lib/db";
import { linkPatchSchema } from "@/lib/validations/link";
import {
  verifyCurrentUserHasAccessToLink,
  verifyCurrentUserHasAccessToProject,
} from "@/lib/api/auth";
import { getLinkForProject, getRandomKey } from "@/lib/api/links";

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
    key: z.string(),
  }),
});

/**
 * Get Single Link for Project
 */
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this link.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 });
    }

    const key = await getRandomKey(params.slug);

    return new Response(JSON.stringify(key));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

/**
 * Create/Update Single Link for Project
 */
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this link.
    if (!(await verifyCurrentUserHasAccessToLink(params.slug, params.key))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = linkPatchSchema.parse(json);

    // Update the link.
    // TODO: Implement sanitization for content.
    await db.link.update({
      where: {
        slug_key: {
          slug: params.slug,
          key: params.key,
        },
      },
      data: {
        ...body,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToLink(params.slug, params.key))) {
      return new Response(null, { status: 403 });
    }

    // Delete the link.
    await db.link.delete({
      where: {
        slug_key: {
          slug: params.slug,
          key: params.key,
        },
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
