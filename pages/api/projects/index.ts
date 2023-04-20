import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { RequiresProPlanError } from "@/lib/exceptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { projectCreateSchema } from "@/lib/validations/project";
import { Session, withUserAuth } from "@/lib/auth";
import { getLinksForProject } from "@/lib/api/links";
import { countProjects } from "@/lib/api/projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    // Get all Links with the default project
    if (req.method === "GET") {
      try {
        const projects = await getLinksForProject({
          domain: "http://localhost:3000",
          userId: session?.user.id,
        });

        return res.json(projects);
      } catch (error) {
        return res.status(500).end();
      }
    }

    if (req.method === "POST") {
      console.log("POST");
      try {
        const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);

        // If user is on a free plan.
        // Check if user has reached limit of 3 projects.
        if (!subscriptionPlan?.isPro) {
          const count = await countProjects(session.user.id);

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
        console.log(error);

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
);

// export default withMethods(["GET", "POST"], handler);
