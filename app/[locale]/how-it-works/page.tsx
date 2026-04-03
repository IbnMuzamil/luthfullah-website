import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pages, config } from "@/lib/db"
import { HowItWorksContent } from "@/components/how-it-works-content"

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await config.get()
  const pageData = await pages.getPage("how-it-works")
  
  return {
    title: `${pageData?.headline || "How It Works"} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: pageData?.subheadline || "A clear, transparent process that takes you from initial idea to completed infrastructure.",
  }
}

export default async function HowItWorksPage() {
  const data = (await pages.getPage("how-it-works")) || {
    headline: "From Vision to Reality",
    subheadline: "A clear, transparent process that takes you from initial idea to completed infrastructure",
    detailedSteps: [],
    trustPoints: []
  }

  return (
    <>
      <SiteHeader />
      <HowItWorksContent data={data} />
      <SiteFooter />
    </>
  )
}
