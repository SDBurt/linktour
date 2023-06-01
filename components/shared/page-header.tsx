import { cn } from "@/lib/utils"

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function AppHeader({
  heading,
  text,
  className,
  children,
  ...props
}: DocsPageHeaderProps) {
  return (
    <>
      <div className={cn("space-y-2", className)} {...props}>
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="inline-block font-heading text-4xl lg:text-5xl">
              {heading}
            </h1>
            {text && <p className="text-md text-muted-foreground">{text}</p>}
          </div>
          {children}
        </div>
      </div>
      <hr className="my-4" />
    </>
  )
}
