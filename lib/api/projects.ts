import { db } from "@/lib/db"

/**
 * Get All Projects for the user
 */
export const countProjectsForUser = async (userId: string) => {
  const count = await db.project.count({
    where: {
      userId,
    },
  })

  return count
}

/**
 * Get All Projects for the user
 */
export const getProjectsForUser = async (userId: string) => {
  const userProjects = await db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      verified: true,
      links: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return userProjects
}

/**
 * Get All Projects for the user
 */
export const getProjectsForUserNav = async (userId: string) => {
  const userProjects = await db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return userProjects
}

/**
 * Get Project
 */
export const getProject = async (slug: string) => {
  const project = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      slug: true,
      verified: true,
      links: true,
      user: true,
      theme: true,
      createdAt: true,
    },
  })

  return project
}

/**
 * Get Project User
 */
export const getProjectUser = async (slug: string) => {
  const projectUser = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return projectUser
}

/**
 * Get Project Usage
 */
export const getProjectUsage = async (slug: string) => {
  const projectUsage = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      usage: true,
      ownerUsageLimit: true,
      ownerExceededUsage: true,
    },
  })

  return projectUsage
}

/**
 * Get Project Theme
 */
export const getProjectTheme = async (slug: string) => {
  const projectTheme = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      theme: true,
    },
  })

  return projectTheme
}
