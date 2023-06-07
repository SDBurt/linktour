interface EditorProps {
  children?: React.ReactNode
}

export default function BioLayout({ children }: EditorProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {children}
    </div>
  )
}
