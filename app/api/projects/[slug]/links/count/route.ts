import * as z from "zod";

import { countLinksForProject } from "@/lib/api/links";
import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth";

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

/**
 * Count links for project
 */
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 });
    }

    const count = await countLinksForProject(params.slug);

    return new Response(JSON.stringify(count));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
