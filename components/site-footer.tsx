import { config } from "@/lib/db"
import { SiteFooterContent } from "./site-footer-content"

export async function SiteFooter() {
  const siteConfig = await config.get()
  
  return <SiteFooterContent config={siteConfig} />
}
