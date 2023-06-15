import { Dispatch, SetStateAction } from "react"

import { ThemeProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ButtonsForm from "./form/buttons-form"

interface ButtonsCardProps {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export default function ButtonsCard({ theme, setTheme }: ButtonsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
      </CardHeader>
      <CardContent>
        <ButtonsForm theme={theme} setTheme={setTheme} />
      </CardContent>
    </Card>
  )
}
