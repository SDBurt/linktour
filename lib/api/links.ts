import { db } from "@/lib/db"

import { LinkProps } from "../types"
import { nanoid } from "../utils"

/**
 * Count Links For Project
 */
export const countLinksForProject = async (slug: string) => {
  const count = await db.link.count({
    where: {
      slug,
    },
  })

  return count
}

/**
 * Get link details
 */
export const getLinkForProject = async (slug: string, key: string) => {
  return await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
  })
}

/**
 * Get All Links for user
 */
export const getLinksForUser = async (userId: string) => {
  return await db.link.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    where: {
      userId: userId,
    },
  })
}

/**
 * Get All Links for project
 */
export async function getLinksForProject(slug: string): Promise<LinkProps[]> {
  return await db.link.findMany({
    where: {
      slug,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

/**
 * Get a random key for a link
 */
export async function getRandomKey(slug: string): Promise<string> {
  /* recursively get random key till it gets one that's avaialble */
  const key = nanoid()
  const response = await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
  })
  if (response) {
    // by the off chance that key already exists
    return getRandomKey(slug)
  } else {
    return key
  }
}

export async function IncrementClick(slug: string, key: string) {
  const link = await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
    select: {
      clicks: true,
    },
  })

  if (!link) {
    return null
  }

  return await db.link.update({
    where: {
      slug_key: {
        slug: slug,
        key: key,
      },
    },
    data: {
      clicks: link?.clicks ? link?.clicks + 1 : 1,
    },
  })
}
