import { clerkClient } from "@clerk/nextjs";

export const getUser = async(userId: string) => {
  const user = await clerkClient.users.getUser(userId);
  
  return user
}