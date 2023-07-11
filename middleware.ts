import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

import { reservedkeys } from "@/config/site"
import BioMiddleware from "@/lib/middleware/bio"

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const key = decodeURIComponent(req.nextUrl.pathname.split("/")[1])
    if (!reservedkeys.includes(key) && auth.isPublicRoute) {
      return BioMiddleware(req, evt)
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  },
  publicRoutes: ["/", "/((?!admin|api).*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
