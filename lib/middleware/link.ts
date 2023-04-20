import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";
import { parse } from "@/lib/middleware/utils";
import { REDIRECT_HEADERS } from "@/lib/constants";

export default async function LinkMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const url = req.nextUrl.clone();
  const { domain, key } = parse(req);

  console.log("domain: ", domain, "key: ", key);

  if (!domain || !key) {
    return NextResponse.next();
  }
  const addr = process.env.NEXT_PUBLIC_APP_URL + `/api/redirect/${key}`;

  let data = null;
  try {
    console.info(addr);
    const response = await fetch(addr);
    data = await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }

  if (!data) {
    console.error("No Response");
    return NextResponse.redirect(url, REDIRECT_HEADERS);
  }

  const { url: redirectUrl } = data;

  if (redirectUrl) {
    console.error("Redirecting to ", redirectUrl);
    return NextResponse.redirect(redirectUrl, REDIRECT_HEADERS);
  }

  url.pathname = "/";
  return NextResponse.redirect(url, REDIRECT_HEADERS);
}
