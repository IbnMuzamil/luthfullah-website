import { projects } from "@/lib/db"
import { WhatWeBuildContent } from "./what-we-build-content"

export async function WhatWeBuildSection() {
  const allProjects = await projects.getAll()
  
  return <WhatWeBuildContent projects={allProjects} />
}
