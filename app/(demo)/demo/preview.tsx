import React from "react"

import Bio from "@/components/shared/bio/bio"

export default function Preview({ user, project, socials, theme, links }) {
  return (
    <div className="h-[729px] w-[340px] overflow-hidden rounded-[3rem] ring-8 ring-slate-800">
      <Bio
        user={user}
        socials={socials}
        project={project}
        theme={theme}
        links={links}
      />
    </div>
  )
}
