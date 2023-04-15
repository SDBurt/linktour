import { getServerSession } from "next-auth";

import { NextApiRequest, NextApiResponse } from "next";
import { UserProps, ProjectProps } from "@/lib/types";
import { authOptions } from "./auth-options";
import { db } from "@/lib/db";

export interface Session {
  user: {
    email?: string | null;
    id?: string | null;
    name?: string | null;
  };
}

interface WithUserNextApiHandler {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session,
    user?: UserProps
  ): Promise<void | NextApiResponse<any>>;
}

interface WithProjectNextApiHandler {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    project?: ProjectProps,
    session?: Session,
    user?: UserProps
  ): Promise<void | NextApiResponse<any>>;
}

export const withUserAuth =
  (handler: WithUserNextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getServerSession(req, res, authOptions)) as Session;

    console.log("HERE");

    if (!session?.user.id || !session.user.id) {
      return res.status(401).end("Unauthorized");
    }

    return handler(req, res, session);
  };
export function withProjectAuth(handler: WithProjectNextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user.id) {
        return res.status(401).end("Unauthorized");
      }

      const { slug } = req.query;

      const project = (await db.project.findUnique({
        where: {
          slug: slug as string,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          slug: true,
          domain: true,
        },
      })) as ProjectProps;

      return handler(req, res, project, session);
    } catch (err) {
      return res.status(500).end();
    }
  };
}
