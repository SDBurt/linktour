import React, { Dispatch, SetStateAction } from "react"
import { Link } from "@prisma/client"

import { Icons } from "@/components/shared/icons"
import {
  ControlPopoverItem,
  GripPopover,
} from "@/components/shared/popover/list-control-popover"

interface LinkGrip {
  index: number
  links: Pick<
    Link,
    | "id"
    | "title"
    | "slug"
    | "key"
    | "index"
    | "createdAt"
    | "url"
    | "clicks"
    | "thumbnail"
    | "thumbnailType"
  >[]
  setLinks: Dispatch<
    SetStateAction<
      Pick<
        Link,
        | "id"
        | "title"
        | "slug"
        | "key"
        | "index"
        | "createdAt"
        | "url"
        | "clicks"
        | "thumbnail"
        | "thumbnailType"
      >[]
    >
  >
}

export default function LinkGrip({ links, setLinks, index }: LinkGrip) {
  function incrementPosition(index) {
    setLinks((prev) => {
      if (index === prev.length - 1) {
        return prev
      }
      const newLinks = [...prev]
      const tmp = newLinks[index]
      newLinks[index] = newLinks[index + 1]
      newLinks[index + 1] = tmp

      return newLinks
    })
  }

  function decrementPosition(index) {
    setLinks((prev) => {
      if (index === 0) {
        return prev
      }
      const newLinks = [...prev]
      const tmp = newLinks[index]
      newLinks[index] = newLinks[index - 1]
      newLinks[index - 1] = tmp

      return newLinks
    })
  }

  function MoveUp() {
    console.log("decrement")
    decrementPosition(index)
  }

  function MoveDown() {
    console.log("increment")
    incrementPosition(index)
  }

  const LinkGripOptions: ControlPopoverItem[] = [
    {
      label: "Move Up",
      name: "moveup",
      icon: <Icons.arrowUp />,
      action: MoveUp,
    },
    {
      label: "Move Down",
      name: "movedown",
      icon: <Icons.arrowDown />,
      action: MoveDown,
    },
  ]

  return <GripPopover options={LinkGripOptions} />
}
