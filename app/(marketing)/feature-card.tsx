import React from "react"

interface FeatureCardProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function FeatureCard({
  title,
  subtitle,
  children,
}: FeatureCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        {children}
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
