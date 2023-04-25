import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";
import { parse } from "@/lib/middleware/utils";
import { REDIRECT_HEADERS } from "@/lib/constants";
import { recordClick } from "@/lib/tinybird";

export default async function LinkMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const url = req.nextUrl.clone();
  const { domain, key } = parse(req);

  if (!domain || !key) {
    return NextResponse.next();
  }
  const addr = process.env.NEXT_PUBLIC_APP_URL + `/api/redirect/${key}`;

  let data = null;
  try {
    console.log(addr);
    const response = await fetch(addr);
    data = await response.json();
  } catch (err) {
    url.pathname = "/";
    return NextResponse.redirect(url, REDIRECT_HEADERS);
  }

  if (!data) {
    url.pathname = "/";
    return NextResponse.redirect(url, REDIRECT_HEADERS);
  }

  const { url: redirectUrl } = data;

  // if (!req.headers.get("no-track")) {
  //   ev.waitUntil(recordClick(domain, req, key)); // track the click only if there is no `dub-no-track` header
  // }

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl, REDIRECT_HEADERS);
  }

  url.pathname = "/";
  return NextResponse.redirect(url, REDIRECT_HEADERS);
}
