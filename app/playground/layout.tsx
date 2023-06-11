interface EditorProps {
  children?: React.ReactNode
}

export default function BioLayout({ children }: EditorProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      {children}
    </div>
  )
}
