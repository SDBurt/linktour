import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function verifyCurrentUser() {
  const session = await getServerSession(authOptions);

  return session !== null;
}

export async function verifyCurrentUserHasAccessToProject(slug: string) {
  const session = await getServerSession(authOptions);
  const count = await db.project.count({
    where: {
      slug: slug,
      userId: session?.user.id,
    },
  });

  return count > 0;
}

export async function verifyCurrentUserHasAccessToLink(
  slug: string,
  key: string
) {
  const session = await getServerSession(authOptions);
  const count = await db.link.count({
    where: {
      slug: slug,
      key: key,
      userId: session?.user.id,
    },
  });

  return count > 0;
}
