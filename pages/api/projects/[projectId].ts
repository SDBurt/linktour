import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withProject } from "@/lib/api-middlewares/with-project";
import { db } from "@/lib/db";
import { projectPatchSchema } from "@/lib/validations/project";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log("GET: ", req.query.projectId);
    const projectId = req.query.projectId as string;
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectId) {
      throw new Error("Short project not found.");
    }

    return res.status(200).json(project);
  } else if (req.method === "DELETE") {
    try {
      await db.project.delete({
        where: {
          id: req.query.projectId as string,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  } else if (req.method === "PATCH") {
    try {
      const projectId = req.query.projectId as string;
      const project = await db.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        throw new Error("Short project not found.");
      }

      const body = projectPatchSchema.parse(req.body);

      await db.project.update({
        where: {
          id: project.id,
        },
        data: {
          name: body.name || project.name,
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

export default withMethods(["GET", "DELETE", "PATCH"], withProject(handler));
