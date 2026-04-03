import { config } from "@/lib/db"
import { SiteHeaderContent } from "./site-header-content"

export async function SiteHeader() {
  const siteConfig = await config.get()
  
  return <SiteHeaderContent config={siteConfig} />
}
