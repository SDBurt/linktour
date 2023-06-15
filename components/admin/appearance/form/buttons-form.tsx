import { Dispatch, SetStateAction } from "react"
import { HexColorPicker } from "react-colorful"

import { PreviewButtonThemes, buttonOptions } from "@/lib/constants/appearance"
import { ThemeButtonStyleTypeProps, ThemeProps } from "@/lib/types"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PreviewButton from "@/components/shared/bio/bio-preview-button"

interface ButtonsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  theme: ThemeProps
  setTheme: Dispatch<SetStateAction<ThemeProps>>
}

function ButtonOptionContainer({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col space-y-2">{children}</div>
}

function ButtonOptionGroup({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="grid grid-cols-3 gap-8">{children}</div>
}

function ButtonOptionItem({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="w-full py-2">{children}</div>
}

export default function ButtonsForm({ theme, setTheme }: ButtonsFormProps) {
  const typeChangedHandler = (value: ThemeButtonStyleTypeProps) => {
    setTheme((prev) => ({ ...prev, buttonType: value }))
  }

  const backgroundColorChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, buttonBackgroundColor: value }))
  }

  const textColorChangedHandler = (value: string) => {
    setTheme((prev) => ({ ...prev, buttonTextColor: value }))
  }

  return (
    <form className="flex flex-col space-y-4">
      <Label>Type</Label>
      <ButtonOptionContainer>
        <Label>Fill</Label>
        <ButtonOptionGroup>
          {buttonOptions.button.fill.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <ButtonOptionItem>
                <PreviewButton
                  onClick={() => typeChangedHandler(option.name)}
                  buttonTextColor={
                    PreviewButtonThemes[option.name].buttonTextColor
                  }
                  buttonBackgroundColor={
                    PreviewButtonThemes[option.name].buttonBackgroundColor
                  }
                  buttonBorderColor={
                    PreviewButtonThemes[option.name].buttonBorderColor
                  }
                  buttonType={option.name}
                  active={theme.buttonType === option.name}
                />
              </ButtonOptionItem>
            </div>
          ))}
        </ButtonOptionGroup>
        <Label>Outline</Label>
        <ButtonOptionGroup>
          {buttonOptions.button.outline.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <ButtonOptionItem>
                <PreviewButton
                  onClick={() => typeChangedHandler(option.name)}
                  buttonTextColor={
                    PreviewButtonThemes[option.name].buttonTextColor
                  }
                  buttonBackgroundColor={
                    PreviewButtonThemes[option.name].buttonBackgroundColor
                  }
                  buttonBorderColor={
                    PreviewButtonThemes[option.name].buttonBorderColor
                  }
                  buttonType={option.name}
                  active={theme.buttonType === option.name}
                />
              </ButtonOptionItem>
            </div>
          ))}
        </ButtonOptionGroup>
        <Label>Soft Shadow</Label>
        <ButtonOptionGroup>
          {buttonOptions.button.softShadow.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <ButtonOptionItem>
                <PreviewButton
                  onClick={(e) => typeChangedHandler(option.name)}
                  buttonTextColor={
                    PreviewButtonThemes[option.name].buttonTextColor
                  }
                  buttonBackgroundColor={
                    PreviewButtonThemes[option.name].buttonBackgroundColor
                  }
                  buttonBorderColor={
                    PreviewButtonThemes[option.name].buttonBorderColor
                  }
                  buttonType={option.name}
                  active={theme.buttonType === option.name}
                />
              </ButtonOptionItem>
            </div>
          ))}
        </ButtonOptionGroup>
        <Label>Hard Shadow</Label>
        <ButtonOptionGroup>
          {buttonOptions.button.hardShadow.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <ButtonOptionItem>
                <PreviewButton
                  onClick={() => typeChangedHandler(option.name)}
                  buttonTextColor={
                    PreviewButtonThemes[option.name].buttonTextColor
                  }
                  buttonBackgroundColor={
                    PreviewButtonThemes[option.name].buttonBackgroundColor
                  }
                  buttonBorderColor={
                    PreviewButtonThemes[option.name].buttonBorderColor
                  }
                  buttonType={option.name}
                  active={theme.buttonType === option.name}
                />
              </ButtonOptionItem>
            </div>
          ))}
        </ButtonOptionGroup>
      </ButtonOptionContainer>

      <Label>Button Colour</Label>
      <div className="flex flex-row space-x-2">
        <Dialog>
          <DialogTrigger>
            <div
              className={"h-10 w-10 rounded ring-1 ring-muted"}
              style={{ backgroundColor: theme.buttonBackgroundColor }}
            ></div>
          </DialogTrigger>
          <DialogContent className="w-62 p-8">
            <h1>Button Background Color</h1>
            <HexColorPicker
              color={theme.buttonBackgroundColor}
              onChange={backgroundColorChangedHandler}
            />
            <Input
              id="background-colour"
              value={theme.buttonBackgroundColor}
              onChange={(e) => backgroundColorChangedHandler(e.target.value)}
            />
          </DialogContent>
        </Dialog>
        <Input
          id="background-colour"
          value={theme.buttonBackgroundColor}
          onChange={(e) => backgroundColorChangedHandler(e.target.value)}
        />
      </div>

      <Label>Font Colour</Label>
      <div className="flex flex-row space-x-2">
        <Dialog>
          <DialogTrigger>
            <div
              className={"h-10 w-10 rounded ring-1 ring-muted"}
              style={{ backgroundColor: theme.buttonTextColor }}
            ></div>
          </DialogTrigger>
          <DialogContent className="w-62 p-8">
            <h1>Button Text Color</h1>
            <HexColorPicker
              color={theme.buttonTextColor}
              onChange={textColorChangedHandler}
            />
            <Input
              id="background-colour"
              value={theme.buttonTextColor}
              onChange={(e) => textColorChangedHandler(e.target.value)}
            />
          </DialogContent>
        </Dialog>
        <Input
          id="background-colour"
          value={theme.buttonTextColor}
          onChange={(e) => textColorChangedHandler(e.target.value)}
        />
      </div>
    </form>
  )
}
