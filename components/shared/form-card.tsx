import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { projectCreateSchema } from "@/lib/validations/project";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CardFormProps extends React.HTMLAttributes<HTMLFormElement> {
  submitHandler: () => void;
  isSaving: boolean;
  defaultValues: object;
  resolver: Resolver<object, any> | undefined;
}

export function FormCard({
  submitHandler,
  isSaving,
  defaultValues,
  resolver,
  className,
  ...props
}: CardFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(submitHandler)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </form>
  );
}
