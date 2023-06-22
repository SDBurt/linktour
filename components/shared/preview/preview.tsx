import React from "react"

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Preview({ children }: PreviewProps) {
  return (
    <div className="h-[729px] w-[340px] overflow-hidden rounded-[3rem] ring-8 ring-slate-800">
      {children}
    </div>
  )
}
