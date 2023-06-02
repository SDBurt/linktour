import { NextRequest } from "next/server"

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string
  domain = domain.replace("www.", "") // remove www. from domain
  const path = req.nextUrl.pathname
  const key = decodeURIComponent(path.split("/")[1]) // decodeURIComponentto handle foreign languages like Hebrew
  const fullKey = decodeURIComponent(path).slice(1)

  return { domain, path, key, fullKey }
}
