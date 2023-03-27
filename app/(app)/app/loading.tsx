import { DashboardHeader } from "@/components/header"
import { ShortLinkCreateButton } from "@/components/short-link/short-link-create-button"
import { ShortLinkItem } from "@/components/short-link/short-link-item"
import { DashboardShell } from "@/components/layouts/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <ShortLinkCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <ShortLinkItem.Skeleton />
        <ShortLinkItem.Skeleton />
        <ShortLinkItem.Skeleton />
        <ShortLinkItem.Skeleton />
        <ShortLinkItem.Skeleton />
      </div>
    </DashboardShell>
  )
}