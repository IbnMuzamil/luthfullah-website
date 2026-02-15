import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksPreview } from "@/components/how-it-works-preview"
import { WhatWeBuildSection } from "@/components/what-we-build-section"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorksPreview />
        <WhatWeBuildSection />
      </main>
      <SiteFooter />
    </>
  )
}
