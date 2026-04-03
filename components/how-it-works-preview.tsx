import { pages } from "@/lib/db"
import { HowItWorksPreviewContent } from "./how-it-works-preview-content"

export async function HowItWorksPreview() {
  const pageData = await pages.getPage("how-it-works")
  
  return <HowItWorksPreviewContent data={pageData} />
}
