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
  const { domain, linkId } = parse(req);

  console.log("domain: ", domain, "linkId: ", linkId);

  if (!domain || !linkId) {
    return NextResponse.next();
  }
  const addr = process.env.NEXT_PUBLIC_APP_URL + `/api/links/${linkId}`;
  console.log(addr);
  const response = await fetch(addr);

  const data = await response.json();
  console.log(data);
  if (!data) {
    console.error("No Response");
    return NextResponse.redirect(url, REDIRECT_HEADERS);
  }

  const { destinationUrl } = data;

  if (destinationUrl) {
    console.error("Redirecting to ", destinationUrl);
    return NextResponse.redirect(destinationUrl, REDIRECT_HEADERS);
  }

  url.pathname = "/";
  return NextResponse.redirect(url, REDIRECT_HEADERS);
}
