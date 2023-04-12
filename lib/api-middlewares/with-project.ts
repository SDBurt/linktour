import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";

export const schema = z.object({
  projectId: z.string(),
});

export function withProject(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query);

      // Check if the user has access to this post.
      const session = await getServerSession(req, res, authOptions);
      const count = await db.project.count({
        where: {
          id: query.projectId,
          userId: session?.user.id,
        },
      });

      if (count < 1) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  };
}
