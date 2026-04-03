import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactContent } from "@/components/contact-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Luthfullah",
  description: "Have questions about starting a project? We're here to help.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <ContactContent />
      <SiteFooter />
    </>
  )
}
