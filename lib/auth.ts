import { getServerSession } from "next-auth";

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ProjectProps } from "@/lib/types";
import { authOptions } from "./auth-options";
import { db } from "@/lib/db";
import * as z from "zod";

export function withUserAuth(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    console.log("withUserAuth");

    const session = await getServerSession(req, res, authOptions);

    console.log("SESSION: ", session);
    if (!session) {
      console.log("No Session");
      return res.status(403).end();
    }

    return handler(req, res);
  };
}

export const linkSchema = z.object({
  key: z.string(),
});

export function withLinkAuth(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log("withLinkAuth");
      const query = await linkSchema.parse(req.query);

      const session = await getServerSession(req, res, authOptions);

      if (!session?.user.id) {
        return res.status(403).end();
      }

      const count = await db.link.count({
        where: {
          userId: session.user.id,
          key: query.key,
        },
      });

      if (count < 1) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        return res.status(422).json(err.issues);
      }

      return res.status(500).end();
    }
  };
}

export const projectSchema = z.object({
  slug: z.string(),
});

export function withProjectAuth(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await projectSchema.parse(req.query);

      const session = await getServerSession(req, res, authOptions);

      if (!session?.user.id) {
        return res.status(403).end();
      }

      const project = (await db.project.findUnique({
        where: {
          slug: query.slug,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          slug: true,
          domain: true,
        },
      })) as ProjectProps;

      if (project.userId !== session?.user.id) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(422).json(err.issues);
      }

      return res.status(500).end();
    }
  };
}
