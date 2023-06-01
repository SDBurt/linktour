import { auth } from "@clerk/nextjs"
import { Theme } from "@prisma/client"
import * as z from "zod"

import { freePlanValues } from "@/config/subscriptions"
import {
  countProjectsForUser,
  getProject,
  getProjectsForUser,
} from "@/lib/api/projects"
import THEME from "@/lib/constants/theme"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { projectCreateSchema } from "@/lib/validations/project"

/**
 * Get a list of projects for the user
 */
export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 403 })
    }

    const projects = await getProjectsForUser(userId)

    return new Response(JSON.stringify(projects))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

/**
 * Create a new project for the user
 */
export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(userId)

    // If user is on a free plan.
    // Check if user has reached limit of 3 projects.
    if (!subscriptionPlan?.isPro) {
      const count = await countProjectsForUser(userId)

      if (count >= freePlanValues.project.count) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()

    const body = projectCreateSchema.parse(json)

    const { slug } = body

    const project = await getProject(slug)

    if (project) {
      return new Response("Slug is already in use", { status: 422 })
    }

    const data = {
      ...body,
      userId: userId,
    }

    const newProject = await db.project.create({
      data,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    })

    await db.theme.create({
      data: { ...THEME, projectSlug: newProject.slug },
    })

    return new Response(JSON.stringify(newProject))
  } catch (err) {
    console.error(err)
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 422 })
    }

    if (err instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
