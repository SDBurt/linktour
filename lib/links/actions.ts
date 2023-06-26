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
 * Increment link index
 */
export const incrementLinkIndex = async (id: string) => {
  const ref = await getLink(id)

  if (!ref) {
    return null
  }

  const link = await db.link.update({
    where: {
      id,
    },
    data: {
      order: ref.order + 1,
    },
  })

  return link
}

/**
 * Decrement link index
 */
export const decrementLinkIndex = async (id: string) => {
  const ref = await getLink(id)

  if (!ref || ref.order === 0) {
    return null
  }

  const link = await db.link.update({
    where: {
      id,
    },
    data: {
      order: ref.order - 1,
    },
  })

  return link
}

/**
 * reorderLinks
 */
export const reorderLinks = async (newOrder: Link[]) => {
  const result = await Promise.allSettled([
    newOrder.map((link, index) => {
      return db.link.update({
        where: {
          id: link.id,
        },
        data: {
          order: index,
        },
      })
    }),
  ])

  return result
}
