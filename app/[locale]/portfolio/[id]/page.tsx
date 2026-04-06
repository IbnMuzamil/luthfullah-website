import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Link } from "@/lib/navigation"
import { portfolio, config } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Globe2, ArrowLeft } from "lucide-react"

export async function generateMetadata({ params: { locale, id } }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const siteConfig = await config.get()
  const item = portfolio.getById(id)

  if (!item) {
    return {
      title: `Portfolio Project | ${siteConfig.header?.brandName || "Luthfullah"}`,
    }
  }

  return {
    title: `${item.title} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: item.description || `Learn more about our completed ${item.category} infrastructure project.`,
  }
}

export async function generateStaticParams() {
  const items = await portfolio.getAll()
  return items.map((item: any) => ({ id: item.id }))
}

export default async function PortfolioItemPage({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  const item = portfolio.getById(id)
  if (!item) notFound()

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white overflow-hidden">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-16">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-black">Portfolio Case Study</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-deep">{item.title}</h1>
              <p className="max-w-3xl text-slate-600 leading-relaxed">{item.description}</p>
            </div>
            <Button asChild variant="outline" className="h-14 rounded-2xl px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
              <Link href="/impact">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
            <div className="space-y-10">
              <Card className="overflow-hidden border border-slate-100 shadow-sm">
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image
                    src={item.featuredImage || item.imageUrl || item.gallery?.[0] || "/beautiful-mosque-architecture.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Location</p>
                      <p className="mt-3 font-bold text-slate-900">{item.location}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Cost</p>
                      <p className="mt-3 font-bold text-slate-900">${Number(item.cost || 0).toLocaleString()}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Completed</p>
                      <p className="mt-3 font-bold text-slate-900">{item.completionDate ? new Date(item.completionDate).toLocaleDateString() : 'TBD'}</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Category</p>
                      <p className="mt-3 font-bold text-slate-900">{item.category || 'Infrastructure'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Client</p>
                      <p className="mt-3 font-bold text-slate-900">{item.client || 'Community Partner'}</p>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                    <h2 className="text-xl font-black text-brand-deep mb-4">Impact Summary</h2>
                    <p className="text-slate-600 leading-relaxed">{item.benefit || 'This project delivered measurable value to the community through sustainable infrastructure improvements.'}</p>
                  </div>
                </CardContent>
              </Card>

              {item.gallery?.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {item.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 border border-slate-200">
                      <Image src={image} alt={`${item.title} gallery ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <Card className="rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-sm">
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-black text-brand-deep">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Status</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">{item.status || 'Completed'}</div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-black">Project Scope</p>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-6 border border-slate-200">
                    <div className="flex items-center gap-3 text-slate-500 text-sm uppercase tracking-[0.2em] font-black mb-3">
                      <MapPin className="w-4 h-4" /> Location
                    </div>
                    <p className="font-bold text-slate-900">{item.location}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-6 border border-slate-200">
                    <div className="flex items-center gap-3 text-slate-500 text-sm uppercase tracking-[0.2em] font-black mb-3">
                      <DollarSign className="w-4 h-4" /> Investment
                    </div>
                    <p className="font-bold text-slate-900">${Number(item.cost || 0).toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-6 border border-slate-200">
                    <div className="flex items-center gap-3 text-slate-500 text-sm uppercase tracking-[0.2em] font-black mb-3">
                      <Globe2 className="w-4 h-4" /> Reach
                    </div>
                    <p className="font-bold text-slate-900">Local partners and beneficiaries</p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
