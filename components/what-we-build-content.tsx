"use client"

import { Card } from "@/components/ui/card"
import { School, Building2, Droplets, Home, Users, Check, Plus, ShoppingCart, HeartPulse, Moon, Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"
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
    "Iftar": { icon: Moon, color: "from-sky-500 to-primary", gradient: "bg-gradient-to-br from-sky-500/20 to-primary/20", label: t("categories.iftar") },
    "iftar": { icon: Moon, color: "from-sky-500 to-primary", gradient: "bg-gradient-to-br from-sky-500/20 to-primary/20", label: t("categories.iftar") },
    "Adha": { icon: Star, color: "from-amber-500 to-primary", gradient: "bg-gradient-to-br from-amber-500/20 to-primary/20", label: t("categories.adha") },
    "adha": { icon: Star, color: "from-amber-500 to-primary", gradient: "bg-gradient-to-br from-amber-500/20 to-primary/20", label: t("categories.adha") },
    "healthcare": { icon: HeartPulse, color: "from-rose-500 to-primary", gradient: "bg-gradient-to-br from-rose-500/20 to-primary/20", label: t("categories.communityCenters") }, // Fallback label
  }

  const DEFAULT_STYLE = { icon: Building2, color: "from-primary to-accent", gradient: "bg-gradient-to-br from-primary/20 to-accent/20", label: "" }

  useEffect(() => {
    if (projects.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projects.forEach((_, index) => {
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
  }, [projects, locale])

  const projectList = projects.length > 0 ? projects : [
    { title: t("categories.mosques"), description: "Places of worship built to last generations.", image: "/beautiful-mosque-architecture.jpg", category: "Mosques" },
    { title: t("categories.schools"), description: "Educational facilities transforming lives.", image: "/modern-school-exterior.png", category: "Schools" },
    { title: t("categories.waterSanitation"), description: "Essential infrastructure for health.", image: "/water-well-facility.jpg", category: "Water & Sanitation" },
  ]

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projectList.map((project, index) => {
              const style = CATEGORY_MAP[project.category] || DEFAULT_STYLE
              const Icon = style.icon
              const isVisible = visibleCards.includes(index)
              const isInCart = project.id && items.some((item) => item.id === project.id)

              const handleAddToCart = (e: React.MouseEvent) => {
                e.stopPropagation()
                if (project.id && !isInCart) {
                  addItem({
                    id: project.id,
                    title: typeof project.title === "object" ? project.title[locale] || project.title.en : project.title,
                    category: project.category,
                    location:
                      typeof project.location === "object" ? project.location[locale] || project.location.en : project.location,
                    cost: project.cost,
                    imageUrl: project.imageUrl || project.image || "/placeholder.jpg",
                  })
                }
              }

              return (
                <Card
                  key={project.id || index}
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
                      alt={typeof project.title === "object" ? project.title[locale] || project.title.en : project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                    />
                  </div>

                  <div className="p-5 md:p-6 space-y-3 relative z-20 flex-grow flex flex-col">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                      {typeof project.title === "object" ? project.title[locale] || project.title.en : project.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
                      {typeof project.description === "object"
                        ? project.description[locale] || project.description.en
                        : project.description}
                    </p>
                    {project.location && (
                      <p className="text-xs font-medium text-primary uppercase tracking-wider">
                        {typeof project.location === "object"
                          ? project.location[locale] || project.location.en
                          : project.location}
                      </p>
                    )}

                    <div className="pt-4 flex items-center justify-between border-t border-primary/10 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          {t("cost")}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {project.cost
                            ? new Intl.NumberFormat(locale === "ar" ? "ar-SA" : locale, {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              }).format(project.cost)
                            : "---"}
                        </span>
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
      </div>
    </section>
  )
}
