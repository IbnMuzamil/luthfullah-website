'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Users, Building2, Globe, Heart } from 'lucide-react'

export function ImpactStats() {
  const t = useTranslations('home.stats')
  const [visibleStats, setVisibleStats] = useState<number[]>([])
  const [counts, setCounts] = useState({ projects: 0, countries: 0, donors: 0, impact: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats = useMemo(() => [
    {
      value: 847,
      label: t('projects'),
      icon: Building2,
      color: 'from-blue-600 to-blue-400',
      lightColor: 'bg-blue-100',
    },
    {
      value: 42,
      label: t('countries'),
      icon: Globe,
      color: 'from-green-600 to-green-400',
      lightColor: 'bg-green-100',
    },
    {
      value: 125000,
      label: t('donors'),
      icon: Users,
      color: 'from-purple-600 to-purple-400',
      lightColor: 'bg-purple-100',
    },
    {
      value: 580,
      label: t('impact'),
      icon: Heart,
      color: 'from-red-600 to-red-400',
      lightColor: 'bg-red-100',
    },
  ], [t])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...new Set([...prev, index])])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [stats])

  useEffect(() => {
    if (visibleStats.length > 0) {
      const animationDuration = 2000
      const frameRate = 60
      const totalFrames = Math.round((animationDuration / 1000) * frameRate)
      let frameCount = 0

      const interval = setInterval(() => {
        frameCount++
        const progress = frameCount / totalFrames
        setCounts({
          projects: Math.floor(847 * progress),
          countries: Math.floor(42 * progress),
          donors: Math.floor(125000 * progress),
          impact: Math.floor(580 * progress),
        })

        if (frameCount >= totalFrames) {
          clearInterval(interval)
          setCounts({ projects: 847, countries: 42, donors: 125000, impact: 580 })
        }
      }, 1000 / frameRate)

      return () => clearInterval(interval)
    }
  }, [visibleStats])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Global Impact at Scale
            </h2>
            <p className="text-base md:text-xl text-slate-300/80 max-w-2xl mx-auto">
              Transforming charitable intentions into real-world infrastructure across continents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const isVisible = visibleStats.includes(index)
              const displayValue =
                index === 0
                  ? counts.projects
                  : index === 1
                    ? counts.countries
                    : index === 2
                      ? counts.donors
                      : counts.impact

              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 hover:bg-slate-900/80 transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`text-xs font-black px-2 py-1 rounded-lg ${stat.lightColor} text-slate-700`}>
                        Active
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="text-4xl md:text-5xl font-black text-white font-mono">
                        {displayValue.toLocaleString()}
                        {index === 2 ? 'K+' : index === 3 ? 'M' : '+'}
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-slate-300/80 font-medium">{stat.label}</p>

                    <div className="mt-4 pt-4 border-t border-slate-700/30">
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                        {index === 0 && 'Mosques, Schools & Community Centers'}
                        {index === 1 && 'Across Africa, Middle East & Asia'}
                        {index === 2 && 'Worldwide contributors'}
                        {index === 3 && 'Infrastructure Created'}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
