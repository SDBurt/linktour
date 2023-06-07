import { cn } from "@/lib/utils"

function EditorContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full rounded-md bg-muted", className)} {...props} />
  )
}

function EditorBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-start space-x-2 rounded-md bg-muted p-2",
        className
      )}
      {...props}
    />
  )
}

export { EditorContainer, EditorBlock }
