import { Dispatch, SetStateAction } from "react"
import { HexColorPicker } from "react-colorful"

import { ThemeBackgroundStyleProps, ThemeProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

interface BackgroundCardProps {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export function BackgroundCard({ theme, setTheme }: BackgroundCardProps) {
  const styleChangedHandler = (value: ThemeBackgroundStyleProps) => {
    setTheme((prev) => ({ ...prev, backgroundStyle: value }))
  }

  const colorChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, backgroundColor: value }))
  }

  const gradientChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, gradientColor: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Style</Label>
          <RadioGroup
            defaultValue={theme.backgroundStyle}
            orientation="vertical"
            value={theme.backgroundStyle}
            onValueChange={styleChangedHandler}
          >
            {options.background.style.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <Label htmlFor="background-colour">Background Colour</Label>

          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
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
                      className={"h-10 w-10 rounded"}
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
      </CardContent>
    </Card>
  )
}
