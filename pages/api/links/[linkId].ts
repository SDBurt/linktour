import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withLink } from "@/lib/api-middlewares/with-link";
import { db } from "@/lib/db";
import { linkPatchSchema } from "@/lib/validations/link";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log("GET: ", req.query.linkId);
    const linkId = req.query.linkId as string;
    const link = await db.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!linkId) {
      throw new Error("Short link not found.");
    }

    return res.status(200).json(link);
  } else if (req.method === "DELETE") {
    try {
      await db.link.delete({
        where: {
          id: req.query.linkId as string,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  } else if (req.method === "PATCH") {
    try {
      const linkId = req.query.linkId as string;
      const link = await db.link.findUnique({
        where: {
          id: linkId,
        },
      });

      if (!link) {
        throw new Error("Short link not found.");
      }

      const body = linkPatchSchema.parse(req.body);

      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          title: body.title || link.title,
          key: body.key,
          url: body.url,
        },
      });

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error);
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["GET", "DELETE", "PATCH"], withLink(handler));
