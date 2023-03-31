import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RequiresProPlanError } from "@/lib/exceptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { projectCreateSchema } from "@/lib/validations/project";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (req.method === "GET") {
    try {
      const projects = await db.project.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          domain: true,
          createdAt: true,
        },
        where: {
          userId: user.id,
        },
      });

      return res.json(projects);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    console.log("POST");
    try {
      const subscriptionPlan = await getUserSubscriptionPlan(user.id);

      // If user is on a free plan.
      // Check if user has reached limit of 3 projects.
      if (!subscriptionPlan?.isPro) {
        const count = await db.project.count({
          where: {
            userId: user.id,
          },
        });

        if (count >= 3) {
          throw new RequiresProPlanError();
        }
      }

      const body = projectCreateSchema.parse(req.body);

      const post = await db.project.create({
        data: {
          ...body,
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      return res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end();
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["GET", "POST"], handler);
