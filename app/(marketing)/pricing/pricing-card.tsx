import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
  name: string;
  features: string[];
  cost: number;
}

export default function PricingCard({
  name,
  features,
  cost = 9,
}: PricingCardProps) {
  return (
    <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          What&apos;s included in the {name} plan
        </h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {features.map((feature: string, index) => (
            <li key={`${name}-feature-${index}`} className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">${cost}</h4>
          <p className="text-sm font-medium text-muted-foreground">
            Billed Monthly
          </p>
        </div>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
      </div>
    </div>
  );
}
