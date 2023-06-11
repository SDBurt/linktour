import { PreviewButtonThemes } from "@/lib/constants/appearance"
import THEME from "@/lib/constants/theme"
import { ThemeButtonStyleTypeProps } from "@/lib/types"
import PreviewButton from "@/components/shared/bio/bio-preview-button"
import { BioEditor } from "@/components/shared/editor/bio-editor"
import { IconPopover } from "@/components/shared/popover/icon-selector/icon-popover"

export default async function PlaygroundPage() {
  async function clickHandler(name: string) {
    "use server"
    console.log("Clicked " + name)
  }

  const buttonTypes: ThemeButtonStyleTypeProps[] = [
    "FILL",
    "FILL_ROUNDED",
    "FILL_CIRCULAR",
    "OUTLINE",
    "OUTLINE_ROUNDED",
    "OUTLINE_CIRCULAR",
    "SOFTSHADOW",
    "SOFTSHADOW_ROUNDED",
    "SOFTSHADOW_CIRCULAR",
    "HARDSHADOW",
    "HARDSHADOW_ROUNDED",
    "HARDSHADOW_CIRCULAR",
  ]

  const { buttonType } = THEME

  return (
    <section id="items" className="container">
      <div className="grid grid-cols-3 gap-4 rounded border p-4">
        <div className="col-span-1 space-x-2 rounded border border-red-600 p-2">
          <IconPopover onClick={clickHandler} />
        </div>
        <div className="col-span-1 rounded border border-blue-600 p-2">
          <BioEditor />
        </div>
        <div className="col-span-1 rounded border border-green-600 p-2">
          <ul className="flex flex-col space-y-2">
            {buttonTypes.map((type: ThemeButtonStyleTypeProps) => {
              return (
                <li key={`button_${type}`} className="p-2">
                  <PreviewButton
                    buttonTextColor={PreviewButtonThemes[type].buttonTextColor}
                    buttonBackgroundColor={
                      PreviewButtonThemes[type].buttonBackgroundColor
                    }
                    buttonBorderColor={
                      PreviewButtonThemes[type].buttonBorderColor
                    }
                    buttonType={type}
                    active={buttonType === type}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
