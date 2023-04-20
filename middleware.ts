import { parse } from "@/lib/middleware/utils";
import AppMiddleware from "@/lib/middleware/app";
import LinkMiddleware from "./lib/middleware/link";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECTS } from "./lib/constants";
import { isReservedKey } from "./lib/utils";
import ApiMiddleware from "./lib/middleware/api";
import RootMiddleware from "./lib/middleware/root";

// export default withAuth(
// async function middleware(req: NextRequest, ev: NextFetchEvent) {
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key } = parse(req);
  const home = domain === "localhost:3000";

  if (domain === "app.localhost:3000") {
    return AppMiddleware(req);
  }

  if (domain === "api.localhost:3000") {
    return ApiMiddleware(req);
  }

  if (path.startsWith("/stats/")) {
    return NextResponse.next();
  }

  if (key.length === 0) {
    return RootMiddleware(req, ev);
  }

  if (home) {
    if (DEFAULT_REDIRECTS[key]) {
      return NextResponse.redirect(DEFAULT_REDIRECTS[key]);
    }
    // TODO: Reserved
  }

  console.log("LINK MIDDLEWARE");
  return LinkMiddleware(req, ev);
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
