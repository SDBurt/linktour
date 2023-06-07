import { Button } from "@/components/ui/button"
import { BioEditor } from "@/components/shared/editor/bio-editor"
import { IconPopover } from "@/components/shared/popover/icon-selector/icon-popover"

export default async function PlaygroundPage() {
  async function clickHandler(name: string) {
    "use server"
    console.log("Clicked " + name)
  }

  return (
    <section id="items" className="container">
      <div className="grid grid-cols-3 gap-4 rounded border p-4">
        <div className="col-span-1 space-x-2 rounded border border-red-600 p-2">
          <IconPopover onClick={clickHandler} />
        </div>
        <div className="col-span-1 rounded border border-blue-600 p-2">
          <BioEditor />
        </div>
      </div>
    </section>
  )
}
