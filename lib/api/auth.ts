import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function verifyCurrentUser() {
  const { userId } = auth()

  return userId !== null
}

export async function verifyCurrentUserHasAccessToProject(slug: string) {
  const { userId } = auth()
  const count = await db.project.count({
    where: {
      slug: slug,
      userId: userId as string,
    },
  })

  return count > 0
}

export async function verifyCurrentUserHasAccessToLink(
  slug: string,
  key: string
) {
  const { userId } = auth()
  const count = await db.link.count({
    where: {
      slug: slug,
      key: key,
      userId: userId as string,
    },
  })

  return count > 0
}
