import * as z from "zod";

import { countLinksForProject, getLinksForProject } from "@/lib/api/links";
import { verifyCurrentUserHasAccessToProject } from "@/lib/api/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { RequiresProPlanError } from "@/lib/exceptions";
import { linkCreateSchema } from "@/lib/validations/link";
import { db } from "@/lib/db";

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

/**
 * Get Links for Project
 */
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 });
    }

    const links = await getLinksForProject(params.slug);

    return new Response(JSON.stringify(links));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.slug))) {
      return new Response(null, { status: 403 });
    }

    // Session exists if it reaches this point
    const { user } = (await getServerSession(authOptions)) as Session;
    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // If user is on a free plan.
    // Check if user has reached limit of 3 projects.
    if (!subscriptionPlan?.isPro) {
      const count = await countLinksForProject(params.slug);

      if (count >= 3) {
        throw new RequiresProPlanError();
      }
    }

    const json = await req.json();
    const body = linkCreateSchema.parse(json);

    const link = await db.link.create({
      data: {
        userId: user.id,
        slug: params.slug,
        ...body,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(link));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 });
    }

    return new Response(null, { status: 500 });
  }
}
