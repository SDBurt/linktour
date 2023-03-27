import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "./utils";

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parse(req);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const isAuthPage = path.startsWith("/login") || path.startsWith("/register");

  if (!isAuth) {
    if (!isAuthPage) {
      let from = path;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.rewrite(new URL(`/app${path}`, req.url));
  // return null;
}
