import * as z from "zod";
import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth";
import { getProject } from "@/lib/api/projects";

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 });
    }

    // Get the project usage.
    const project = await getProject(params.slug);

    if (!project) {
      return new Response(JSON.stringify(0), { status: 200 });
    }

    return new Response(JSON.stringify(1), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
