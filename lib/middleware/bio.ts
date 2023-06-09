import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"

import { parse } from "@/lib/middleware/utils"
import { recordClick } from "@/lib/tinybird"

export const BioMiddleware: NextMiddleware = async (
  req: NextRequest,
  ev: NextFetchEvent
) => {
  const { key } = parse(req)
  if (key) {
    ev.waitUntil(recordClick(key, req))
  }
  return NextResponse.next()
}

export default BioMiddleware
