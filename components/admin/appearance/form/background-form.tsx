import React, { Dispatch, SetStateAction, useMemo } from "react"
import { HexColorPicker } from "react-colorful"

import { ThemeBackgroundStyleProps, ThemeProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface BackgroundFormProps extends React.HTMLAttributes<HTMLFormElement> {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

const options = {
  background: {
    style: [
      { label: "Flat Colour", name: "FLAT" },
      { label: "Gradient Up", name: "COLORUP" },
      { label: "Gradient Down", name: "COLORDOWN" },
    ],
    color: "#02A291",
    gradient: "#02A291",
  },
}

export function BackgroundForm({ theme, setTheme }: BackgroundFormProps) {
  const styleChangedHandler = (value: ThemeBackgroundStyleProps) => {
    setTheme((prev) => ({ ...prev, backgroundStyle: value }))
  }

  const colorChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, backgroundColor: value }))
  }

  const gradientChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, gradientColor: value }))
  }

  const backgroundStyle = (type) => {
    let style = {}
    if (type === "COLORUP") {
      style = {
        background: `linear-gradient(${theme.backgroundColor}, ${theme.gradientColor})`,
      }
    } else if (type === "COLORDOWN") {
      style = {
        background: `linear-gradient(${theme.gradientColor}, ${theme.backgroundColor})`,
      }
    } else {
      style = { backgroundColor: theme.backgroundColor }
    }
    return style
  }

  return (
    <form className="flex flex-col space-y-4">
      <Label>Style</Label>
      <div className="grid grid-cols-3 gap-4">
        {options.background.style.map((option) => (
          <div
            key={option.name}
            className={cn(
              "border border-muted p-4 hover:cursor-pointer hover:border-muted-foreground",
              theme.backgroundStyle === option.name &&
                "border-2 border-muted-foreground"
            )}
            onClick={(e) =>
              styleChangedHandler(option.name as ThemeBackgroundStyleProps)
            }
          >
            <div
              className="flex h-10 w-full items-center justify-center p-4 py-2 font-medium ring-1 ring-muted"
              style={backgroundStyle(option.name)}
            />
          </div>
        ))}
      </div>

      <Label htmlFor="background-colour">Background Colour</Label>
      <div className="flex flex-row space-x-2">
        <Dialog>
          <DialogTrigger>
            <div
              className={"h-10 w-10 rounded ring-1 ring-muted"}
              style={{ backgroundColor: theme.backgroundColor }}
            ></div>
          </DialogTrigger>
          <DialogContent className="w-62 p-8">
            <HexColorPicker
              color={theme.backgroundColor}
              onChange={colorChangedHandler}
            />
          </DialogContent>
        </Dialog>
        <Input
          id="background-colour"
          value={theme.backgroundColor}
          onChange={(e) => colorChangedHandler(e.target.value)}
        />
      </div>
      {theme.backgroundStyle !== "FLAT" && (
        <>
          <Label htmlFor="gradient-colour">Gradient Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded ring-1 ring-muted"}
                  style={{ backgroundColor: theme.gradientColor }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={theme.gradientColor}
                  onChange={gradientChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="gradient-colour"
              value={theme.gradientColor}
              onChange={(e) => gradientChangedHandler(e.target.value)}
            />
          </div>
        </>
      )}
    </form>
  )
}
