import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { db } from "@/lib/db";
import { linkPatchSchema } from "@/lib/validations/link";
import { withUserAuth, linkSchema } from "@/lib/auth";

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
      });

      return res.status(200).json(link);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  } else if (req.method === "DELETE") {
    try {
      await db.link.delete({
        where: {
          slug_key: {
            slug,
            key,
          },
        },
      });

      return res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  } else if (req.method === "PATCH") {
    try {
      const link = await db.link.findUnique({
        where: {
          slug_key: {
            slug,
            key,
          },
        },
      });

      const body = linkPatchSchema.parse(req.body);
      const where = {
        slug_key: {
          slug,
          key,
        },
      };

      console.log(where);

      await db.link.update({
        where: where,
        data: {
          title: body.title || link?.title,
          key: body.key,
          url: body.url,
        },
      });

      return res.end();
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withUserAuth(handler);
