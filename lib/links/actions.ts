"use server"

import { Link } from "@prisma/client"

import { db } from "@/lib/db"

/**
 * get link by id
 */
export const getLink = async (id: string) => {
  const link = await db.link.findUnique({
    where: {
      id,
    },
  })

  return link
}

/**
 * reorderLinks
 */
export const reorderLinks = async (newOrder: { id: Link["id"] }[]) => {
  const result = await Promise.allSettled([
    newOrder.map((item, index) => {
      return db.link.update({
        where: {
          id: item.id,
        },
        data: {
          order: index,
        },
      })
    }),
  ])

  return result
}
