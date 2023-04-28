import { AppHeader } from "@/components/shared/page-header";
import { LinkCreateButton } from "@/components/admin/link/link-create-button";
import { LinkItem } from "@/components/admin/link/link-item";
import { AppShell } from "@/components/admin/layouts/shell";

export default function DashboardLoading() {
  return (
    <AppShell>
      <AppHeader heading="Links" text="Create and manage links.">
        <LinkCreateButton />
      </AppHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    </AppShell>
  );
}
