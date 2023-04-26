"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { projectCreateSchema } from "@/lib/validations/project";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectFormProps extends React.HTMLAttributes<HTMLFormElement> {
  project?: Pick<Project, "id" | "name" | "slug">;
}

type FormData = z.infer<typeof projectCreateSchema>;

export function ProjectCreateForm({
  project,
  className,
  ...props
}: ProjectFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      name: project?.name || "",
      slug: project?.slug || "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    console.log(data);
    setIsSaving(true);

    const response = await fetch(`/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        slug: data.slug,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      console.error(await response.json());
      return toast({
        title: "Something went wrong.",
        description: "Your project was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your project has been updated.",
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create Project</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-2 w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              placeholder="ex: dub"
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
            <Label htmlFor="slug">Slug</Label>
            <div className="flex w-full items-center">
              <Label
                htmlFor="slug"
                className=" text-slate-600 h-10 items-center font-normal rounded-l-md border border-r-0 border-slate-300 bg-slate-50 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                LinkShortener/
              </Label>
              <Input
                id="slug"
                className="w-full border rounded-r-md rounded-l-none"
                size={32}
                placeholder="Your project slug"
                {...register("slug")}
              />
            </div>
            {errors?.slug && (
              <p className="px-1 text-xs text-red-600">{errors.slug.message}</p>
            )}
          </div>
        </Card.Content>
        <Card.Footer>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </Card.Footer>
      </Card>
    </form>
  );
}
