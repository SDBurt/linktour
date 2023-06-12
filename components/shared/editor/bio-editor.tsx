import { randomUUID } from "crypto"
import { EditorBlockType, EditorComponentType } from "@/types"

import { LinkItem } from "@/components/admin/link/link-item"

import CustomButton from "../bio/bio-link-button"
import {
  GripPopover,
  type ControlPopoverItem,
} from "../popover/list-control-popover"
import { EditorBlock, EditorContainer } from "./ui/editor"

const testData: EditorComponentType = {
  time: new Date().getTime(),
  theme: {
    key: "custom",
    luminance: "DARK",
    socialStyleColor: "",
    backgroundColor: "#02a291",
    gradientColor: "#02a291",
    backgroundStyle: "FLAT",
    backgroundType: "COLOR",
    buttonBackgroundColor: "#ffffff",
    buttonShadowColor: "#000000",
    buttonTextColor: "#888888",
    buttonType: "SOFTSHADOW_CIRCULAR",
    typefaceColor: "#f5f5f5",
    typefaceFamily: "inter",
  },
  blocks: [
    {
      id: randomUUID(),
      type: "link",
      data: {
        link: {
          id: "123",
          key: "github",
          title: "Github",
          url: "https://github.com/sdburt",
          thumbnail: "http://via.placeholder.com/640x360",
          thumbnailType: "image",
          slug: "sdburt",
          createdAt: new Date(),
          clicks: 2,
        },
      },
    },
    {
      id: randomUUID(),
      type: "link",
      data: {
        link: {
          id: "1234",
          key: "Linkedin",
          title: "linkedin",
          url: "https://linkedin.com/seanburt8",
          thumbnail: "http://via.placeholder.com/640x360",
          thumbnailType: "image",
          slug: "sdburt",
          createdAt: new Date(),
          clicks: 10,
        },
      },
    },
  ],
}

const gripPopoverOptions: ControlPopoverItem[] = [
  {
    label: "Header 1",
    name: "header1",
  },
  {
    label: "Header 2",
    name: "header2",
  },
]

const editorComponentMap = {
  link: LinkItem,
}

function Block({ name, props }: { props: any; name: string }) {
  const EditorComponent = editorComponentMap[name]
  return <EditorComponent {...props} />
}

export function BioEditor() {
  return (
    <EditorContainer>
      {testData.blocks.map((block: EditorBlockType) => {
        return (
          <EditorBlock key={block.data.link.key}>
            <GripPopover items={gripPopoverOptions} />
            <Block name={block.type} props={block.data} />
          </EditorBlock>
        )
      })}
    </EditorContainer>
  )
}
