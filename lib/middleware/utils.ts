import { NextRequest } from "next/server";
import { HOME_HOSTNAMES } from "@/lib/constants";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host");

  if (domain) {
    domain = domain.replace("www.", ""); // remove www. from domain
    if (HOME_HOSTNAMES.has(domain)) domain = "dub.sh";
  }

  const path = req.nextUrl.pathname;
  const linkId = decodeURIComponent(path.split("/")[1]); // to handle foreign languages like Hebrew
  return { domain, path, linkId };
};
