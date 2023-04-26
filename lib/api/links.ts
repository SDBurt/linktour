import { db } from "@/lib/db";
import { LinkProps } from "../types";
import { nanoid } from "../utils";

/**
 * Count Links For Project
 */
export const countLinksForProject = async (slug: string) => {
  const count = await db.link.count({
    where: {
      slug,
    },
  });

  return count;
};

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
  });
};

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
  });
};

/**
 * Get All Links for project
 */
export async function getLinksForProject(
  slug: string,
  userId?: string
): Promise<LinkProps[]> {
  return await db.link.findMany({
    where: {
      slug,
      ...(userId && { userId }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get a random key for a link
 */
export async function getRandomKey(slug: string): Promise<string> {
  /* recursively get random key till it gets one that's avaialble */
  const key = nanoid();
  const response = await db.link.findUnique({
    where: {
      slug_key: {
        slug,
        key,
      },
    },
  });
  if (response) {
    // by the off chance that key already exists
    return getRandomKey(slug);
  } else {
    return key;
  }
}
