import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { projectEditSchema } from "@/lib/validations/project";
import { withProjectAuth } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or misconfigured project slug" });
  }

  if (req.method === "GET") {
    try {
      const project = await db.project.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          domain: true,
          name: true,
          slug: true,
          userId: true,
        },
      });

      return res.status(200).json(project);
    } catch (err) {
      console.error(err);
      throw err;
    }
  } else if (req.method === "DELETE") {
    try {
      await db.project.delete({
        where: {
          slug,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  } else if (req.method === "PATCH") {
    try {
      const project = await db.project.findUnique({
        where: {
          slug,
        },
      });

      if (!project) {
        throw new Error("Short project not found.");
      }

      const body = projectEditSchema.parse(req.body);

      await db.project.update({
        where: {
          slug,
        },
        data: {
          ...body,
        },
      });

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(
  ["GET", "DELETE", "PATCH"],
  withProjectAuth(handler)
);
