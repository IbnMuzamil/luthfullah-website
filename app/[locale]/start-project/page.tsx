import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StartProjectContent } from "@/components/start-project-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Your Project | Luthfullah",
  description: "Tell us about your vision and we'll help you turn it into lasting community impact.",
}

export default function StartProjectPage() {
  return (
    <>
      <SiteHeader />
      <StartProjectContent />
      <SiteFooter />
    </>
  )
}
