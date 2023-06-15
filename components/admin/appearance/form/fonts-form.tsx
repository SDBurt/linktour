import { Dispatch, SetStateAction } from "react"
import { HexColorPicker } from "react-colorful"

import { ThemeProps } from "@/lib/types"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FontsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

export default function FontsForm({ theme, setTheme }: FontsFormProps) {
  const fontColorChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, typefaceColor: value }))
  }

  return (
    <form className="flex flex-col space-y-4">
      {/* <Label>Family</Label>
          <FontSelector
            currentFont={theme.typefaceFamily}
            setCurrentFont={familyChangedHandler}
            fonts={options.fonts || []}
          /> */}

      <Label>Color</Label>
      <div className="flex flex-row space-x-2">
        <Dialog>
          <DialogTrigger>
            <div
              className={"h-10 w-10 rounded ring-1 ring-muted"}
              style={{ backgroundColor: theme.typefaceColor }}
            ></div>
          </DialogTrigger>
          <DialogContent className="w-62 p-8">
            <HexColorPicker
              color={theme.typefaceColor}
              onChange={fontColorChangedHandler}
            />
          </DialogContent>
        </Dialog>
        <Input
          id="background-colour"
          value={theme.typefaceColor}
          onChange={(e) => fontColorChangedHandler(e.target.value)}
        />
      </div>
    </form>
  )
}
