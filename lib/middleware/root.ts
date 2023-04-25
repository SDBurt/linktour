import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { parse } from "./utils";
import { isHomeHostname } from "@/lib/utils";
import { recordClick } from "@/lib/tinybird";

export default async function RootMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const { domain } = parse(req);

  if (!domain) {
    return NextResponse.next();
  }

  if (isHomeHostname(domain)) {
    return NextResponse.next();
  } else {
    // ev.waitUntil(recordClick(domain, req)); // record clicks on root page (if domain is not dub.sh)

    // // rewrite to root page unless the user defines a site to redirect to
    // return NextResponse.rewrite(new URL(`/_root/${domain}`, req.url));
    return NextResponse.next();
  }
}
