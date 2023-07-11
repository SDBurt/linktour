"use server"

import { auth } from "@clerk/nextjs"

export async function getUserId() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  return userId
}
