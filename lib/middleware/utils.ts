import { NextRequest } from "next/server";
import { HOME_HOSTNAMES } from "@/lib/constants";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host");

  if (domain) {
    domain = domain.replace("www.", ""); // remove www. from domain
    if (HOME_HOSTNAMES.has(domain)) domain = "http://localhost:3000";
  }

  const path = req.nextUrl.pathname;
  const key = decodeURIComponent(path.split("/")[1]); // to handle foreign languages like Hebrew
  return { domain, path, key };
};
