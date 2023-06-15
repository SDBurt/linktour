import { Dispatch, SetStateAction } from "react"

import { ThemeProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { BackgroundForm } from "./form/background-form"

interface BackgroundCardProps {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export default function BackgroundCard({
  theme,
  setTheme,
}: BackgroundCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
      </CardHeader>
      <CardContent>
        <BackgroundForm theme={theme} setTheme={setTheme} />
      </CardContent>
    </Card>
  )
}
