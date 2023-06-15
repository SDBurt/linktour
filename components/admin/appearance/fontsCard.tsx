import { Dispatch, SetStateAction } from "react"

import { ThemeProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import FontsForm from "./form/fonts-form"

// import FontSelector from "@/components/admin/appearance/font-selector"

// const options = {
//   fonts: [{ label: "DM Sans", name: "dm sans" }],
// }

interface FontsCardProps {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export default function FontsCard({ theme, setTheme }: FontsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fonts</CardTitle>
      </CardHeader>
      <CardContent>
        <FontsForm theme={theme} setTheme={setTheme} />
      </CardContent>
    </Card>
  )
}
