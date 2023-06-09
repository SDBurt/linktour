"use client"

import React, { useState } from "react"
import { AnimatePresence, Reorder, useDragControls } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Icons } from "@/components/shared/icons"

interface ReorderItemProps {
  item: any
  idField: string
  children: React.ReactNode
}

interface ReorderGroupProps {
  items: any[]
  setItems: any
  children: React.ReactNode
}

function ReorderItem({ item, idField, children }: ReorderItemProps) {
  const [draggable, setDraggable] = useState(false)
  const controls = useDragControls()

  if (!Object.keys(item).includes(idField)) {
    console.warn(`${idField} does not exist on item for ReorderItem`)
    return null
  }

  return (
    <Reorder.Item
      className="w-full rounded-lg"
      value={item}
      id={item[idField]}
      dragListener={draggable}
      dragControls={controls}
    >
      <Card className="p-2">
        <div className="flex w-full flex-row items-center justify-start space-x-2">
          <Icons.grip
            height={20}
            width={20}
            className="min-w-[20px] cursor-pointer"
            onPointerDown={(e) => controls.start(e)}
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)} // retain this for better animation
            onTouchStart={() => setDraggable(true)} // for mobile: need to set draggable to `false` in `onDragEnd` prop, not `onTouchEnd`
          />
          <div className="w-full flex-1">{children}</div>
        </div>
      </Card>
    </Reorder.Item>
  )
}

ReorderItem.displayName = "ReorderItem"

function ReorderGroup({ items, setItems, children }: ReorderGroupProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
        className="flex flex-col space-y-4"
      >
        {children}
      </Reorder.Group>
    </AnimatePresence>
  )
}

ReorderGroup.displayName = "ReorderGroup"

export { ReorderItem, ReorderGroup }
