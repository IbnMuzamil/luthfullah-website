import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { config } from "@/lib/db"
import { HowItWorksContent } from "@/components/how-it-works-content"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "howItWorksPage" })
  const siteConfig = await config.get()
  
  return {
    title: `${t("headline")} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: t("subheadline"),
  }
}

export default async function HowItWorksPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "howItWorksPage" })
  const data = {
    headline: t("headline"),
    subheadline: t("subheadline"),
    trustHeadingPrefix: t("trustHeadingPrefix"),
    trustHeadingHighlight: t("trustHeadingHighlight"),
    ctaTitle: t("cta.title"),
    ctaDescription: t("cta.description"),
    ctaPrimaryLabel: t("cta.primary"),
    ctaSecondaryLabel: t("cta.secondary"),
    detailedSteps: t.raw("detailedSteps") as any[],
    trustPoints: t.raw("trustPoints") as any[],
  }

  return (
    <>
      <SiteHeader />
      <HowItWorksContent data={data} />
      <SiteFooter />
    </>
  )
}
