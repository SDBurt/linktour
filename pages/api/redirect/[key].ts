import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { db } from "@/lib/db";
import { linkPatchSchema } from "@/lib/validations/link";
import { withUserAuth, linkSchema } from "@/lib/auth";

const domain = "localhost:3000";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = await linkSchema.parse(req.query);

  if (req.method === "GET") {
    try {
      const link = await db.link.findUnique({
        where: {
          domain_key: {
            domain,
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
