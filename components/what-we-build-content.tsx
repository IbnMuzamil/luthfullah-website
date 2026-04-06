"use client"

import { Card } from "@/components/ui/card"
import { School, Building2, Droplets, Home, Users, Check, Plus, HeartPulse, Moon, Star } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"

export function WhatWeBuildContent({ projects }: { projects: any[] }) {
  const t = useTranslations("projects")
  const locale = useLocale()
  const { items, addItem } = useCart()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const localize = (value: any, fallback = "") => {
    if (typeof value === "string") return value
    if (value && typeof value === "object") {
      return value[locale] || value.en || fallback
    }
    return fallback
  }

  const CATEGORY_MAP: Record<string, any> = {
    "Mosques": { icon: Building2, color: "from-primary to-accent", gradient: "bg-gradient-to-br from-primary/20 to-accent/20", label: t("categories.mosques") },
    "mosque": { icon: Building2, color: "from-primary to-accent", gradient: "bg-gradient-to-br from-primary/20 to-accent/20", label: t("categories.mosques") },
    "Schools": { icon: School, color: "from-teal to-primary", gradient: "bg-gradient-to-br from-teal/20 to-primary/20", label: t("categories.schools") },
    "school": { icon: School, color: "from-teal to-primary", gradient: "bg-gradient-to-br from-teal/20 to-primary/20", label: t("categories.schools") },
    "Community Centers": { icon: Users, color: "from-accent to-teal", gradient: "bg-gradient-to-br from-accent/20 to-teal/20", label: t("categories.communityCenters") },
    "community": { icon: Users, color: "from-accent to-teal", gradient: "bg-gradient-to-br from-accent/20 to-teal/20", label: t("categories.communityCenters") },
    "Water & Sanitation": { icon: Droplets, color: "from-gold to-primary", gradient: "bg-gradient-to-br from-gold/20 to-primary/20", label: t("categories.waterSanitation") },
    "water": { icon: Droplets, color: "from-gold to-primary", gradient: "bg-gradient-to-br from-gold/20 to-primary/20", label: t("categories.waterSanitation") },
    "Shelters": { icon: Home, color: "from-primary to-gold", gradient: "bg-gradient-to-br from-primary/20 to-gold/20", label: t("categories.shelters") },
    "shelter": { icon: Home, color: "from-primary to-gold", gradient: "bg-gradient-to-br from-primary/20 to-gold/20", label: t("categories.shelters") },
    "wells": { icon: Droplets, color: "from-cyan-500 to-primary", gradient: "bg-gradient-to-br from-cyan-500/20 to-primary/20", label: t("categories.wells") },
    "well": { icon: Droplets, color: "from-cyan-500 to-primary", gradient: "bg-gradient-to-br from-cyan-500/20 to-primary/20", label: t("categories.wells") },
    "boreholes": { icon: Droplets, color: "from-indigo-500 to-primary", gradient: "bg-gradient-to-br from-indigo-500/20 to-primary/20", label: t("categories.boreholes") },
    "borehole": { icon: Droplets, color: "from-indigo-500 to-primary", gradient: "bg-gradient-to-br from-indigo-500/20 to-primary/20", label: t("categories.boreholes") },
    "Iftar": { icon: Moon, color: "from-sky-500 to-primary", gradient: "bg-gradient-to-br from-sky-500/20 to-primary/20", label: t("categories.iftar") },
    "iftar": { icon: Moon, color: "from-sky-500 to-primary", gradient: "bg-gradient-to-br from-sky-500/20 to-primary/20", label: t("categories.iftar") },
    "Adha": { icon: Star, color: "from-amber-500 to-primary", gradient: "bg-gradient-to-br from-amber-500/20 to-primary/20", label: t("categories.adha") },
    "adha": { icon: Star, color: "from-amber-500 to-primary", gradient: "bg-gradient-to-br from-amber-500/20 to-primary/20", label: t("categories.adha") },
    "healthcare": { icon: HeartPulse, color: "from-rose-500 to-primary", gradient: "bg-gradient-to-br from-rose-500/20 to-primary/20", label: t("categories.communityCenters") }, // Fallback label
  }

  const DEFAULT_STYLE = { icon: Building2, color: "from-primary to-accent", gradient: "bg-gradient-to-br from-primary/20 to-accent/20", label: "" }

  const projectList = useMemo(
    () =>
      projects.length > 0
        ? projects
        : [
            { title: t("categories.mosques"), description: "Places of worship built to last generations.", image: "/beautiful-mosque-architecture.jpg", category: "Mosques" },
            { title: t("categories.schools"), description: "Educational facilities transforming lives.", image: "/modern-school-exterior.png", category: "Schools" },
            { title: t("categories.waterSanitation"), description: "Essential infrastructure for health.", image: "/water-well-facility.jpg", category: "Water & Sanitation" },
          ],
    [projects, t],
  )

  useEffect(() => {
    if (projectList.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projectList.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [projectList, locale])

  const groupedProjects = projectList.reduce((acc: Record<string, any[]>, project: any) => {
    const key = (project.category || "other").toLowerCase()
    if (!acc[key]) acc[key] = []
    acc[key].push(project)
    return acc
  }, {})

  const sectorEntries = Object.entries(groupedProjects)

  const formatPrice = (project: any) => {
    const currency = project?.pricing?.currency || "USD"
    const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    })

    if (project?.pricing?.mode === "range" && project?.pricing?.amountMin && project?.pricing?.amountMax) {
      return `${formatter.format(project.pricing.amountMin)} - ${formatter.format(project.pricing.amountMax)}`
    }

    if (project?.pricing?.mode === "starting_from" && project?.pricing?.amountMin) {
      return `${t("startingFrom")} ${formatter.format(project.pricing.amountMin)}`
    }

    const cost = typeof project.cost === "number" ? project.cost : project?.pricing?.amountMin
    return cost ? formatter.format(cost) : "---"
  }

  const getEffectiveCost = (project: any) => {
    if (typeof project.cost === "number") return project.cost
    if (project?.pricing?.amountMin) return project.pricing.amountMin
    return 0
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-secondary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance bg-gradient-to-r from-gold via-primary to-teal bg-clip-text text-transparent">
                {t("headline")}
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-gold via-primary to-teal rounded-full mt-2 animate-shimmer" />
            </div>
            <p className="text-base md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              {t("subheadline")}
            </p>
          </div>

          <div className="space-y-12">
            {sectorEntries.map(([sectorKey, sectorProjects], sectorIndex) => {
              const style = CATEGORY_MAP[sectorKey] || DEFAULT_STYLE
              const SectorIcon = style.icon

              return (
                <div key={sectorKey} className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center`}>
                        <SectorIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-deep">{style.label || sectorKey}</h3>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          {sectorProjects.length} {t("typesAvailable")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {sectorProjects.map((project: any, index: number) => {
                      const sectorOffset = sectorEntries
                        .slice(0, sectorIndex)
                        .reduce((sum, [, prevProjects]) => sum + prevProjects.length, 0)
                      const cardIndex = sectorOffset + index
                      const isVisible = visibleCards.includes(cardIndex)
                      const isInCart = project.id && items.some((item) => item.id === project.id)

                      const handleAddToCart = (e: React.MouseEvent) => {
                        e.stopPropagation()
                        if (project.id && !isInCart) {
                          addItem({
                            id: project.id,
                            title: localize(project.typeName || project.title),
                            category: project.category,
                            location: localize(project.location),
                            cost: getEffectiveCost(project),
                            imageUrl: project.imageUrl || project.image || "/placeholder.jpg",
                          })
                        }
                      }

                      return (
                        <Card
                          key={project.id || cardIndex}
                          className={`group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer border-2 hover:border-primary/30 relative flex flex-col ${
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          }`}
                        >
                          <div
                            className={`absolute inset-0 ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none`}
                          />

                          <div className="aspect-video bg-muted overflow-hidden relative">
                            <Image
                              src={project.imageUrl || project.image || "/placeholder.jpg"}
                              alt={localize(project.typeName || project.title)}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                            />
                          </div>

                          <div className="p-5 md:p-6 space-y-3 relative z-20 flex-grow flex flex-col">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                              <SectorIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                              {localize(project.typeName || project.title)}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
                              {localize(project.description)}
                            </p>
                            {project.location && (
                              <p className="text-xs font-medium text-primary uppercase tracking-wider">{localize(project.location)}</p>
                            )}

                            <div className="pt-4 flex items-center justify-between border-t border-primary/10 mt-2">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t("cost")}</span>
                                <span className="text-lg font-bold text-primary">{formatPrice(project)}</span>
                              </div>

                              {project.id && (
                                <Button
                                  size="sm"
                                  variant={isInCart ? "outline" : "default"}
                                  className={
                                    isInCart
                                      ? "border-primary/30 text-primary bg-primary/5"
                                      : "shadow-md hover:shadow-primary/20 bg-primary hover:bg-primary/90"
                                  }
                                  onClick={handleAddToCart}
                                  disabled={isInCart}
                                >
                                  {isInCart ? (
                                    <>
                                      <Check className="w-4 h-4 mr-2" />
                                      {t("inCart")}
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-4 h-4 mr-2" />
                                      {t("addToCart")}
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      )
                    })}
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
