import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import PricingCard from "./pricing-card";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  const freeFeatures = [
    "2 Projects",
    "2 Users",
    "Basic Analytics",
    "Basic Support",
  ];

  const proFeatures = [
    "Unlimited Projects",
    "Unlimited Users",
    "Extended Analytics",
    "Premium Support",
  ];

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including unlimited project and project features
          for your bio.
        </p>
      </div>

      <PricingCard name={"FREE"} features={freeFeatures} cost={0} />
      <PricingCard name={"PRO"} features={proFeatures} cost={9} />
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          This app is currently under development.{" "}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  );
}
