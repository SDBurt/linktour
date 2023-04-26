import { DashboardHeader } from "@/components/shared/page-header";
import { LinkCreateButton } from "@/components/link/link-create-button";
import { LinkItem } from "@/components/link/link-item";
import { DashboardShell } from "@/components/layouts/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <LinkCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
