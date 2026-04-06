import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/lib/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pages, config } from "@/lib/db"
import { DynamicIcon } from "@/components/dynamic-icon"
import { Sparkles, ArrowRight, CheckCircle2, Plus } from "lucide-react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "whatWeBuildPage" })
  const siteConfig = await config.get()
  
  return {
    title: `${t("headline")} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: t("subheadline"),
  }
}

export default async function WhatWeBuildPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "whatWeBuildPage" })
  const data = (await pages.get("what-we-build")) || { projects: [] }

  const getProjectText = (key: string, fallback: string) => {
    try {
      return t(key)
    } catch {
      return fallback
    }
  }

  const localizedProjects = (data.projects || []).map((project: any) => {
    const key = project.id
    const fallbackBenefits = Array.isArray(project.benefits) ? project.benefits : []
    let translatedBenefits = fallbackBenefits

    try {
      translatedBenefits = t.raw(`projects.${key}.benefits`) as string[]
    } catch {
      translatedBenefits = fallbackBenefits
    }

    return {
      ...project,
      title: getProjectText(`projects.${key}.title`, project.title),
      description: getProjectText(`projects.${key}.description`, project.description),
      impact: getProjectText(`projects.${key}.impact`, project.impact),
      benefits: translatedBenefits,
    }
  })

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white overflow-hidden">
        {/* 2026 Standard Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,82,255,0.03),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,209,255,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* Hero section */}
        <section className="relative pt-40 pb-20 z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-4 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                <span>{t('badge')}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-deep tracking-tighter leading-[0.9] text-balance">
                {t('headline')}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium text-balance max-w-3xl mx-auto">
                {t('subheadline')}
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-32">
              {localizedProjects.map((project: any, index: number) => {
                const isEven = index % 2 === 0

                return (
                  <div
                    id={project.id ?? project.title?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    key={index}
                    className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Image */}
                    <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
                      <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl border-[8px] border-white relative group">
                        <Image
                          src={project.image || "/placeholder.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute -bottom-6 -right-6 md:right-10 bg-white rounded-3xl p-6 shadow-2xl border border-slate-50 animate-float">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                               <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                               <div className="text-brand-deep font-black text-lg leading-none">{t('qualityBadgeTitle')}</div>
                               <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t('qualityBadgeSubtitle')}</div>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`space-y-8 ${!isEven ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                          <DynamicIcon name={project.icon} className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-deep tracking-tight leading-tight">{project.title}</h2>
                      </div>

                      <p className="text-xl text-slate-500 leading-relaxed font-medium">{project.description}</p>

                      <div className="space-y-4">
                        <h3 className="font-black text-brand-deep text-sm uppercase tracking-widest opacity-40">{t('includedTitle')}</h3>
                        <div className="grid gap-3">
                          {project.benefits?.map((benefit: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 text-slate-600 font-bold group">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                              <span className="text-lg">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Card className="p-8 bg-slate-50/50 border-slate-100 rounded-[2rem] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                           <Sparkles className="w-20 h-20" />
                        </div>
                        <p className="font-black text-xs text-primary uppercase tracking-[0.2em] mb-3">{t('impactLabel')}</p>
                        <p className="text-brand-deep text-lg leading-relaxed font-bold">{project.impact}</p>
                      </Card>

                      <Button asChild size="lg" className="bg-primary hover:bg-primary-600 h-16 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 w-full md:w-auto">
                        <Link href="/start-project">
                          {t('projectCta')} <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Custom Projects */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto p-12 md:p-24 bg-brand-deep rounded-[4rem] text-center space-y-10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -ml-48 -mb-48" />
              
              <div className="relative z-10 space-y-8">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white/10 flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                  <Plus className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">{t('custom.title')}</h2>
                <p className="text-xl text-blue-100/70 leading-relaxed max-w-2xl mx-auto font-medium">
                  {t('custom.description')}
                </p>
                <div className="pt-6">
                   <Button size="lg" className="bg-white hover:bg-slate-100 text-brand-deep text-xl h-20 px-12 rounded-3xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95" asChild>
                     <Link href="/start-project">{t('custom.cta')}</Link>
                   </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
