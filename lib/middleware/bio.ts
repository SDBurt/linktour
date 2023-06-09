import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"

import { parse } from "@/lib/middleware/utils"
import { recordClick } from "@/lib/tinybird"

import { db } from "../db"

export const BioMiddleware: NextMiddleware = async (
  req: NextRequest,
  ev: NextFetchEvent
) => {
  const { key } = parse(req)
  if (key) {
    const count = await db.project.count({
      where: {
        slug: key,
      },
    })

    if (count > 0) {
      ev.waitUntil(recordClick(key, req))
    }
  }
  return NextResponse.next()
}

export default BioMiddleware
