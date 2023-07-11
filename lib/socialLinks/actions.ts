import { db } from "@/lib/db"

/**
 * get link by id
 */
export const getSocialsForProject = async (slug: string) => {
  return await db.socialLink.findMany({
    select: {
      id: true,
      type: true,
      order: true,
      active: true,
    },
    where: {
      slug,
    },
    orderBy: {
      order: "asc",
    },
  })
}
