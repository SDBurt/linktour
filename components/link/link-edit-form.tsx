"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { linkPatchSchema } from "@/lib/validations/link";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface linkFormProps extends React.HTMLAttributes<HTMLFormElement> {
  link: Pick<Link, "id" | "title" | "key" | "url" | "clicks">;
}

type FormData = z.infer<typeof linkPatchSchema>;

export function LinkEditForm({ link, className, ...props }: linkFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkPatchSchema),
    defaultValues: {
      title: link?.title || "", // Name of the link
      url: link.url || "", // Destination of the link
      key: link.key || "", // key of the link, uses the domain
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/links/${link.key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data?.title,
        url: data.url,
        key: data.key,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      console.error(await response?.json());
      return toast({
        title: "Something went wrong.",
        description: "Your link was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your link has been updated.",
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
          <Card.Title>Edit Link</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" size={32} {...register("title")} />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}

            <Label htmlFor="key">Key</Label>
            <div className="flex w-full items-center">
              <Label
                htmlFor="key"
                className=" text-slate-600 h-10 items-center font-normal rounded-l-md border border-r-0 border-slate-300 bg-slate-50 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              >
                {link?.domain || "undefined"}
              </Label>
              <Input
                id="key"
                className="w-full border rounded-r-md rounded-l-none"
                size={32}
                placeholder="Your project key"
                {...register("key")}
              />
            </div>
            {errors?.key && (
              <p className="px-1 text-xs text-red-600">{errors.key.message}</p>
            )}

            <Label htmlFor="url">URL</Label>
            <Input id="url" size={32} {...register("url")} />
            {errors?.url && (
              <p className="px-1 text-xs text-red-600">{errors.url.message}</p>
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
