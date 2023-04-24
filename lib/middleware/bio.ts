import { NextRequest, NextResponse } from "next/server";
import { parse } from "@/lib/middleware/utils";
import { REDIRECT_HEADERS } from "@/lib/constants";

export default async function BioMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { domain, path, key } = parse(req);

  if (!domain || !key) {
    return NextResponse.rewrite(new URL(`/bio${path}`, req.url));
  }

  const addr = process.env.NEXT_PUBLIC_APP_URL + `/api/bio/${key}/exists`;

  const response = await fetch(addr);
  const data = await response.json();

  if (!data || data === 0) {
    url.pathname = "/";
    return NextResponse.redirect(url, REDIRECT_HEADERS);
  }

  return NextResponse.rewrite(new URL(`/bio${path}`, req.url));
}
