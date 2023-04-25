import { db } from "@/lib/db";
import { LinkProps } from "../types";

/**
 * Get All Links
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
export async function getLinksForProject({
  userId,
}: {
  slug: string;
  userId?: string;
}): Promise<LinkProps[]> {
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
