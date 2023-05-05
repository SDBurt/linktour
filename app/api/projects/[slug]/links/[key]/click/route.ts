import * as z from "zod";
import { recordClick } from "@/lib/tinybird";
import { NextRequest } from "next/server";

const routeContextSchema = z.object({
  params: z.object({
    slug: z.string(),
    key: z.string(),
  }),
});

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // cookies, geo, ip
    const res = await recordClick(params.slug, req, params.key);

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
