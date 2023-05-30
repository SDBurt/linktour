import { auth } from "@clerk/nextjs"

import { countProjectsForUser } from "@/lib/api/projects"

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 403 })
    }

    const count = await countProjectsForUser(userId)

    return new Response(JSON.stringify(count))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
