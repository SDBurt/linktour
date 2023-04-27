import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <div className="container space-y-2 mt-2">
      <h1>Home Page</h1>
      <Link className={buttonVariants({ variant: "default" })} href="/admin">
        Admin
      </Link>
    </div>
  );
}
