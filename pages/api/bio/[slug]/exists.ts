import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { ProjectProps } from "@/lib/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  console.log(slug);

  if (!slug || typeof slug !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or misconfigured project slug" });
  }

  if (req.method === "GET") {
    const project = (await db.project.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
      },
    })) as ProjectProps;

    if (project) {
      res.status(200).json(1);
    } else {
      res.status(200).json(0);
    }
  }
}

export default withMethods(["GET"], handler);
