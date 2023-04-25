import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";

import { RequiresProPlanError } from "@/lib/exceptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { withUserAuth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const linkCreateSchema = z.object({
  title: z.string(),
  key: z.string(),
  url: z.string(),
});

export const linksSchema = z.object({
  slug: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { slug } = linksSchema.parse(req.query);
  const userId = session?.user.id as string;

  if (req.method === "GET") {
    try {
      const links = await db.link.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        where: {
          userId: userId,
          slug: slug,
        },
      });

      return res.json(links);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    try {
      console.log("POST");
      const subscriptionPlan = await getUserSubscriptionPlan(userId);

      // If user is on a free plan.
      // Check if user has reached limit of 3 posts.
      if (!subscriptionPlan?.isPro) {
        const count = await db.link.count({
          where: {
            userId: userId,
          },
        });

        if (count >= 3) {
          throw new RequiresProPlanError();
        }
      }

      const body = linkCreateSchema.parse(req.body);

      const payload = {
        ...body,
        slug: slug,
        userId: userId,
      };

      console.log(payload);

      const link = await db.link.create({
        data: payload,
        select: {
          id: true,
        },
      });

      return res.json(link);
    } catch (error) {
      console.error(error);
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

export default withMethods(["GET", "POST"], withUserAuth(handler));
