"use server"

import * as z from "zod"

import THEME from "@/lib/constants/theme"
import { db } from "@/lib/db"

import { getUserId } from "../auth/actions"
import { projectCreateSchema } from "../validations/project"

export async function projectExists(slug: string) {
  const project = await db.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  })

  if (project) {
    return true
  } else {
    return false
  }
}

export async function getProject(slug: string) {
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

export async function createProject(formData) {
  const userId = await getUserId()

  const data = projectCreateSchema.parse(formData)

  const { slug } = data

  const exists = await projectExists(slug)

  if (exists) {
    throw new Error("Slug is already in use")
  }

  const newProject = await db.project.create({
    data: {
      ...data,
      userId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  })

  await db.theme.create({
    data: { ...THEME, projectSlug: newProject.slug },
  })

  return newProject
}
