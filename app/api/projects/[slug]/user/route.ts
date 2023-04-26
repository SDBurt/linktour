import * as z from "zod";
import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth";
import { getProjectUser } from "@/lib/api/projects";

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

    // Get the project user.
    const project = await getProjectUser(params.slug);

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
