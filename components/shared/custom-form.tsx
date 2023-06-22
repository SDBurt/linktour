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

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Icons } from "./icons"

interface CustomFormProps extends React.HTMLAttributes<HTMLFormElement> {
  title: string
  items: { [key: string]: string }[]
  defaultValues: { [key: string]: string }
  schema: any
  isSaving: boolean
  submitHandler: (body: any) => Promise<Response>
}
export default function CustomForm({
  title,
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
    const body = JSON.stringify(values)
    const response = await submitHandler(body)

    if (!response?.ok) {
      console.error(await response?.json())
      return toast({
        title: "Something went wrong.",
        description: "Your link was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your link has been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {items.map((item) => {
              return (
                <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.placeholder} {...field} />
                      </FormControl>
                      <FormDescription>{item.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
      </CardContent>
    </Card>
  )
}
