import Image from 'next/image'
import { portfolio } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, MapPin, DollarSign } from 'lucide-react'
import { Link } from '@/lib/navigation'

export async function RecentPortfolioProjects() {
  const items = (await portfolio.getAll()) || []
  const recent = items.slice(-4).reverse()

  if (!recent.length) {
    return (
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-[3rem] border border-slate-200 bg-slate-50 p-16 text-center">
          <p className="text-slate-500 text-xl font-medium">No recent portfolio projects have been added yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary font-black mb-3">Recent Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-deep">Latest Completed Projects</h2>
          <p className="text-slate-500 max-w-2xl mt-3">Browse the newest completed infrastructure projects we’ve delivered with full transparency.</p>
        </div>
        <Button asChild variant="outline" className="h-14 rounded-2xl px-6 border-slate-300 text-slate-700 hover:bg-slate-100">
          <Link href="/impact">View Full Portfolio <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
                <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">No image</div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">{project.status || 'Completed'}</div>
                <div className="text-xs text-slate-400">{project.completionDate ? new Date(project.completionDate).getFullYear() : '2026'}</div>
              </div>
              <CardTitle className="text-xl font-black text-brand-deep leading-tight mb-3">
                {typeof project.title === 'string' ? project.title : project.title?.en || 'Project Title'}
              </CardTitle>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">
                {typeof project.description === 'string' ? project.description : project.description?.en || 'Project description not available.'}
              </p>
              <div className="flex items-center justify-between gap-3 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{typeof project.location === 'string' ? project.location : project.location?.en || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-brand-deep">
                  <DollarSign className="w-4 h-4" />
                  ${Number(project.cost || 0).toLocaleString()}
                </div>
              </div>
              <Button asChild variant="outline" className="mt-6 w-full rounded-2xl border-slate-300 text-slate-700 hover:bg-slate-100">
                <Link href={`/portfolio/${project.id}`}>View Case Study</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
