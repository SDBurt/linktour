import { getServerSession } from "next-auth/next"

import { countProjectsForUser } from "@/lib/api/projects"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const count = await countProjectsForUser(user.id)

    return new Response(JSON.stringify(count))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
