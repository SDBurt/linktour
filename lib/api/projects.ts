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
      links: {
        select: {
          title: true,
          slug: true,
          key: true,
        },
      },
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
      links: {
        orderBy: {
          order: "asc",
        },
      },
      socialLinks: {
        select: {
          id: true,
          order: true,
          type: true,
          url: true,
          active: true,
        },
        orderBy: {
          order: "asc",
        },
      },
      theme: true,
      createdAt: true,
      userId: true,
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
      userId: true,
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
  const projectTheme = await db.theme.findUnique({
    where: {
      projectSlug: slug,
    },
    select: {
      backgroundColor: true,
      backgroundStyle: true,
      backgroundType: true,
      gradientColor: true,
      buttonBackgroundColor: true,
      buttonShadowColor: true,
      buttonTextColor: true,
      buttonType: true,
      key: true,
      luminance: true,
      socialStyleColor: true,
      typefaceColor: true,
      typefaceFamily: true,
    },
  })

  return projectTheme
}

export async function IncrementViews(slug: string) {
  const project = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      views: true,
    },
  })

  if (!project) {
    return null
  }

  return await db.project.update({
    where: {
      slug,
    },
    data: {
      views: project?.views ? project.views + 1 : 1,
    },
  })
}
