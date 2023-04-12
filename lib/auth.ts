import { getServerSession } from "next-auth";

import { NextApiRequest, NextApiResponse } from "next";
import { UserProps } from "./types";
import { authOptions } from "./auth-options";

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
  ): Promise<void>;
}

export function withUserAuth(handler: WithUserNextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user.id) {
        return res.status(401).end("Unauthorized");
      }

      return handler(req, res, session);
    } catch (err) {
      return res.status(500).end();
    }
  };
}
