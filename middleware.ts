import { parse } from "@/lib/middleware/utils";
import AppMiddleware from "@/lib/middleware/app";
import LinkMiddleware from "./lib/middleware/link";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECTS } from "./lib/constants";
import { isReservedKey } from "./lib/utils";

// export default withAuth(
// async function middleware(req: NextRequest, ev: NextFetchEvent) {
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, linkId } = parse(req);
  const home = domain === "dub.sh";

  // for App (app.dub.sh and app.localhost:3000)
  if (domain === "app.dub.sh" || domain === "app.localhost:3000") {
    return AppMiddleware(req);
  }

  if (home) {
    if (DEFAULT_REDIRECTS[linkId]) {
      return NextResponse.redirect(DEFAULT_REDIRECTS[linkId]);
    }
    // TODO: Reserved
  }

  return LinkMiddleware(req, ev);
}

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register"],
// };

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
