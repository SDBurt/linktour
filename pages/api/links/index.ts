import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
import * as z from "zod";

// import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
// import { authOptions } from "@/lib/auth-options";
import { RequiresProPlanError } from "@/lib/exceptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Session, withUserAuth } from "@/lib/auth";

const linkCreateSchema = z.object({
  title: z.string(),
  key: z.string(),
  url: z.string(),
});

// Foreign key constraint failed on the field: `domain`
// Is there a domain called localhost created?
const domain = "localhost:3000";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  // const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (!user || !user.id) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    try {
      const posts = await db.link.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        where: {
          userId: user.id,
        },
      });

      return res.json(posts);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    try {
      console.log("POST");
      const subscriptionPlan = await getUserSubscriptionPlan(user.id);

      // If user is on a free plan.
      // Check if user has reached limit of 3 posts.
      if (!subscriptionPlan?.isPro) {
        const count = await db.link.count({
          where: {
            userId: user.id,
          },
        });

        if (count >= 3) {
          throw new RequiresProPlanError();
        }
      }

      const body = linkCreateSchema.parse(req.body);

      const payload = {
        ...body,
        domain: domain,
        userId: user.id,
      };

      console.log(payload);

      const post = await db.link.create({
        data: payload,
        select: {
          id: true,
        },
      });

      return res.json(post);
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

// export default withMethods(["GET", "POST"], handler);
export default withUserAuth(handler);
