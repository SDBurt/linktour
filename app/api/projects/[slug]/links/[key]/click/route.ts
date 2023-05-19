import * as z from "zod";
import { recordClick } from "@/lib/tinybird";
import { NextRequest } from "next/server";
import { IncrementClick } from "@/lib/api/links";

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
    // tinybird
    await recordClick(params.slug, req, params.key);

    // db total clicks
    const res = await IncrementClick(params.slug, params.key);
    console.log(res);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
