import Image from 'next/image'
import { portfolio } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowRight, MapPin, DollarSign } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

export async function RecentPortfolioProjects() {
  const t = await getTranslations('homePortfolio')
  const locale = await getLocale()
  const items = (await portfolio.getAll()) || []
  const recent = items.slice(-4).reverse()

  const localized = (value: any, fallback: string) => {
    if (typeof value === 'string') return value
    if (value && typeof value === 'object') {
      return value[locale] || value.en || fallback
    }
    return fallback
  }

  if (!recent.length) {
    return (
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-[3rem] border border-slate-200 bg-slate-50 p-16 text-center">
          <p className="text-slate-500 text-xl font-medium">{t('emptyState')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary font-black mb-3">{t('eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-deep">{t('title')}</h2>
          <p className="text-slate-500 max-w-2xl mt-3">{t('subtitle')}</p>
        </div>
        <Button asChild variant="outline" className="h-14 rounded-2xl px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
          <Link href="/impact">{t('viewFullPortfolio')} <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {recent.map((project: any) => (
          <Card key={project.id} className="group overflow-hidden border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {project.featuredImage || project.imageUrl || project.gallery?.[0] ? (
                <Image
                  src={project.featuredImage || project.imageUrl || project.gallery?.[0]}
                  alt={typeof project.title === 'string' ? project.title : project.title?.en || 'Portfolio project'}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">{t('fallbackNoImage')}</div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">{project.status || t('statusCompleted')}</div>
                <div className="text-xs text-slate-400">{project.completionDate ? new Date(project.completionDate).getFullYear() : '2026'}</div>
              </div>
              <CardTitle className="text-xl font-black text-brand-deep leading-tight mb-3">
                {localized(project.title, t('fallbackTitle'))}
              </CardTitle>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">
                {localized(project.description, t('fallbackDescription'))}
              </p>
              <div className="flex items-center justify-between gap-3 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{localized(project.location, t('fallbackLocation'))}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-brand-deep">
                  <DollarSign className="w-4 h-4" />
                  ${Number(project.cost || 0).toLocaleString()}
                </div>
              </div>
              <Button asChild variant="outline" className="mt-6 w-full rounded-2xl border-slate-300 text-slate-700 hover:bg-slate-100">
                <Link href={`/portfolio/${project.id}`}>{t('viewCaseStudy')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
