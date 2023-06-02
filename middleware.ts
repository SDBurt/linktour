import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

import { reservedkeys } from "@/config/site"
import BioMiddleware from "@/lib/middleware/bio"

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const key = decodeURIComponent(req.nextUrl.pathname.split("/")[1])
    if (!reservedkeys.includes(key) && auth.isPublicRoute) {
      return BioMiddleware(req, evt)
    }

    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/login", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }
  },
  publicRoutes: ["/", "/login", "/register", "/((?!admin).*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
