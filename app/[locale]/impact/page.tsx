import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Globe2, Users, Building2, Sparkles, Heart, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { pages, projects, config } from "@/lib/db"
import Image from "next/image"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteConfig = await config.get()
  const pageData = await pages.get("impact")
  
  return {
    title: `${pageData?.headline || "Global Impact"} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: pageData?.subheadline || "See the real difference we're making in communities worldwide.",
  }
}

export default async function ImpactPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const pageData = await pages.get("impact")
  const allProjects = await projects.getAll()
  
  const data = pageData || {
    headline: "Our Global Impact",
    subheadline: "See the real difference we're making in communities worldwide.",
    stats: [],
    stories: []
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white overflow-hidden">
        {/* 2026 Standard Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,82,255,0.03),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,209,255,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Measurable Legacy</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-deep tracking-tighter leading-[0.9] mb-8">
              {data.headline || "Our Global Impact"}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
              {data.subheadline}
            </p>
          </div>

          {/* Stats Section - 2026 Premium Cards */}
          {data.stats && data.stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
              {data.stats.map((stat: any, i: number) => (
                <Card key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all group">
                   <div className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 group-hover:scale-110 transition-transform">
                      {stat.value}
                   </div>
                   <div className="text-sm font-black text-brand-deep uppercase tracking-widest opacity-60">
                      {stat.label}
                   </div>
                </Card>
              ))}
            </div>
          )}

          {/* Featured Stories - Visual Rich Content */}
          {data.stories && data.stories.length > 0 && (
            <div className="space-y-12 mb-32">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px flex-1 bg-slate-100" />
                 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Featured Impact Stories</h2>
                 <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid gap-10">
                {data.stories.map((story: any, i: number) => (
                  <div key={i} className="grid lg:grid-cols-2 gap-10 items-center bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                       <Image 
                         src={story.image || "/modern-school-exterior.png"} 
                         alt={story.title} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-1000"
                       />
                       <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-xl font-black text-xs text-primary shadow-xl">
                          {story.location}
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                             <Heart className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-sm font-black text-primary uppercase tracking-widest">{story.impact}</span>
                       </div>
                       <h3 className="text-3xl md:text-4xl font-black text-brand-deep tracking-tight leading-tight">{story.title}</h3>
                       <p className="text-lg text-slate-500 leading-relaxed font-medium">{story.description}</p>
                       <Button variant="link" className="p-0 text-primary font-black text-lg group-hover:translate-x-2 transition-transform">
                          Read full story <ArrowRight className="ml-2 w-5 h-5" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Grid - Completed Infrastructure */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
               <div>
                  <h2 className="text-4xl font-black text-brand-deep tracking-tight">Completed Infrastructure</h2>
                  <p className="text-slate-500 font-medium mt-2">A record of physical transformation across the globe.</p>
               </div>
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Global Reach: {allProjects.length} Projects
               </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.length === 0 ? (
                <div className="col-span-full text-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Awaiting completed project reports</p>
                </div>
              ) : (
                allProjects.map((project: any) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm group">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={typeof project.title === 'object' ? (project.title[locale] || project.title.en) : project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                          <Building2 className="w-16 h-16 text-slate-200" />
                        </div>
                      )}
                      <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg">
                        {project.category || 'Infrastructure'}
                      </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black mb-4 text-brand-deep tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {typeof project.title === 'object' ? (project.title[locale] || project.title.en) : project.title}
                      </h3>
                      <div className="space-y-3 text-sm text-slate-500 mb-6 font-medium">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary/40" />
                          {typeof project.location === 'object' ? (project.location[locale] || project.location.en) : (project.location || 'Global Location')}
                        </div>
                        {project.cost && (
                          <div className="flex items-center gap-3 font-bold text-brand-deep">
                            <DollarSign className="w-5 h-5 text-primary" />
                            ${Number(project.cost).toLocaleString()} Finalized Budget
                          </div>
                        )}
                      </div>
                      <p className="text-slate-500 line-clamp-3 leading-relaxed font-medium text-base mb-8">
                        {typeof project.description === 'object' ? (project.description[locale] || project.description.en) : project.description}
                      </p>
                      <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-brand-deep font-bold hover:bg-slate-50">
                         View Case Study
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-32 relative rounded-[4rem] bg-brand-deep p-10 md:p-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Ready to Build Your Eternal Legacy?</h2>
              <p className="text-xl text-blue-100/70 mb-12 font-medium leading-relaxed">
                Join our community of visionaries building high-impact, transparent infrastructure for communities in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-600 h-16 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary/20">
                  <Link href="/start-project">Start Your Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-black rounded-2xl border-white/20 text-white hover:bg-white/10">
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
