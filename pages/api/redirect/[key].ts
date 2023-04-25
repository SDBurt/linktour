import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/lib/db";
import { linkSchema } from "@/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, key } = await linkSchema.parse(req.query);

  if (req.method === "GET") {
    try {
      const link = await db.link.findUnique({
        where: {
          slug_key: {
            slug,
            key,
          },
        },
        select: {
          url: true,
        },
      });

      console.log(link);

      return res.status(200).json(link);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}

export default handler;
