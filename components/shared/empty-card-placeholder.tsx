import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

interface EmptyCardPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyCardPlaceholder({
  className,
  children,
  ...props
}: EmptyCardPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyCardPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
}

EmptyCardPlaceholder.Icon = function EmptyCardPlaceholderIcon({
  name,
  className,
  ...props
}: EmptyCardPlaceholderIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <Icon className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

interface EmptyPlacholderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyCardPlaceholder.Title = function EmptyCardPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
};

interface EmptyPlacholderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyCardPlaceholder.Description = function EmptyCardPlaceholderDescription({
  className,
  ...props
}: EmptyPlacholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mt-3 mb-8 text-center text-sm font-normal leading-6 text-slate-700",
        className
      )}
      {...props}
    />
  );
};
