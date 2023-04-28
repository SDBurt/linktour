import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { RequiresProPlanError } from "@/lib/exceptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import {
  countProjectsForUser,
  getProject,
  getProjectsForUser,
} from "@/lib/api/projects";
import { projectCreateSchema } from "@/lib/validations/project";

/**
 * Get a list of projects for the user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const projects = await getProjectsForUser(user.id);

    return new Response(JSON.stringify(projects));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

/**
 * Create a new project for the user
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // If user is on a free plan.
    // Check if user has reached limit of 3 projects.
    if (!subscriptionPlan?.isPro) {
      const count = await countProjectsForUser(session.user.id);

      if (count >= 3) {
        throw new RequiresProPlanError();
      }
    }

    const json = await req.json();

    const body = projectCreateSchema.parse(json);

    const { slug } = body;

    const project = await getProject(slug);

    if (project) {
      return new Response("Slug is already in use", { status: 422 });
    }

    const data = {
      ...body,
      userId: session.user.id,
    };

    const newProject = await db.project.create({
      data,
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(newProject));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 });
    }

    return new Response(null, { status: 500 });
  }
}
