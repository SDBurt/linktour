import { db } from "@/lib/db";

/**
 * Get All Projects for the user
 */
export const countProjects = async (userId: string) => {
  const count = await db.project.count({
    where: {
      userId,
    },
  });

  return count;
};

/**
 * Get All Projects for the user
 */
export const getProjectsForUser = async (userId: string) => {
  const projects = await db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      verified: true,
      links: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return projects;
};

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
      slug: true,
      verified: true,
      links: true,
      createdAt: true,
    },
  });

  return project;
};
