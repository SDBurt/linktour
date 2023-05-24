import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Session, getServerSession } from "next-auth"
import * as z from "zod"

import { db } from "@/lib/db"

import { authOptions } from "./auth-options"

export function withUserAuth(handler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(403).end()
    }

    return handler(req, res, session)
  }
}

export const linkSchema = z.object({
  slug: z.string(),
  key: z.string(),
})

export function withLinkAuth(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await linkSchema.parse(req.query)

      const session = await getServerSession(req, res, authOptions)

      if (!session?.user.id) {
        return res.status(403).end()
      }

      const count = await db.link.count({
        where: {
          userId: session.user.id,
          key: query.key,
        },
      })

      if (count < 1) {
        return res.status(403).end()
      }

      return handler(req, res)
    } catch (err) {
      console.error(err)
      if (err instanceof z.ZodError) {
        return res.status(422).json(err.issues)
      }

      return res.status(500).end()
    }
  }
}

export const projectSchema = z.object({
  slug: z.string(),
})

export function withProjectAuth(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await projectSchema.parse(req.query)

      const session = await getServerSession(req, res, authOptions)

      if (!session?.user.id) {
        return res.status(403).end()
      }

      const count = await db.project.count({
        where: {
          userId: session?.user.id,
          slug: query.slug,
        },
      })

      if (count < 1) {
        return res.status(403).end()
      }

      return handler(req, res)
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(422).json(err.issues)
      }

      return res.status(500).end()
    }
  }
}
