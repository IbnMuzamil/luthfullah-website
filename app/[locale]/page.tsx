import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { WhatWeBuildSection } from "@/components/what-we-build-section"
import { pages } from "@/lib/db"

export default async function HomePage() {
  const pageData = await pages.getPage("index")
  
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection data={pageData?.hero} />
        <HowItWorksPreview />
        <WhatWeBuildSection />
      </main>
      <SiteFooter />
    </>
  )
}
