import React, { Dispatch, SetStateAction } from "react"

import { ThemeProps } from "@/lib/types"

import { BackgroundForm } from "../admin/appearance/form/background-form"
import ButtonsForm from "../admin/appearance/form/buttons-form"
import FontsForm from "../admin/appearance/form/fonts-form"

interface AppearanceFormProps {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export default function AppearanceForm({
  theme,
  setTheme,
}: AppearanceFormProps) {
  return (
    <div className="flex flex-col space-y-4">
      <BackgroundForm theme={theme} setTheme={setTheme} />
      <ButtonsForm theme={theme} setTheme={setTheme} />
      <FontsForm theme={theme} setTheme={setTheme} />
    </div>
  )
}
