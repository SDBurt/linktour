import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";
import { parse } from "./utils";

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parse(req);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const isAuthPage = path.startsWith("/login") || path.startsWith("/register");

  console.log("isAuthPage: ", isAuthPage);
  console.log("isAuth: ", isAuth);

  if (!isAuth && !isAuthPage) {
    console.log("redirecting to login");
    let from = path;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  } else if (isAuth && isAuthPage) {
    console.log("continue");
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!isAuth && isAuthPage) {
    return NextResponse.next();
  }

  // if (!isAuthPage) {
  //   if (isAuth) {
  //     console.log("continue");
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  //   if (!isAuth) {
  //     console.log("redirecting to login");
  //     let from = path;
  //     if (req.nextUrl.search) {
  //       from += req.nextUrl.search;
  //     }

  //     return NextResponse.redirect(
  //       new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
  //     );
  //   }
  // }

  // if (isAuthPage) {
  //   if (!isAuth) {
  //     return NextResponse.next();
  //   }

  //   if (!isAuth) {
  //     console.log("redirecting to login");
  //     let from = path;
  //     if (req.nextUrl.search) {
  //       from += req.nextUrl.search;
  //     }

  //     return NextResponse.redirect(
  //       new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
  //     );
  //   }

  // }

  return NextResponse.rewrite(new URL(`/app${path}`, req.url));
}
