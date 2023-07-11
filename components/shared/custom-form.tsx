import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Icons } from "./icons"

interface CustomFormProps extends React.HTMLAttributes<HTMLFormElement> {
  items: { [key: string]: string }[]
  defaultValues: { [key: string]: string }
  schema: any
  isSaving: boolean
  submitHandler: (body: any) => Promise<Response>
}
export default function CustomForm({
  defaultValues,
  schema,
  submitHandler,
  isSaving,
  items,
  className,
  ...props
}: CustomFormProps) {
  const resolver = z.object(schema)

  // 1. Define your form.
  const form = useForm<z.infer<typeof resolver>>({
    resolver: zodResolver(resolver),
    defaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resolver>) {
    const response = await submitHandler(values)

    if (!response?.ok) {
      console.error(await response?.json())
      return toast({
        title: "Something went wrong.",
        description: "Unable to updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Submit Successful.",
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        {...props}
      >
        {items.map((item) => {
          return (
            <div id={item.name}>
              <FormField
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} />
                    </FormControl>
                    {item?.description && (
                      <FormDescription>{item.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )
        })}
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
