import React from "react"

import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardContentContainer,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <Card className={cn(className, "h-full w-full")}>
      <CardHeader>
        <CardTitle></CardTitle>
        <p className="text-muted-foreground"></p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
