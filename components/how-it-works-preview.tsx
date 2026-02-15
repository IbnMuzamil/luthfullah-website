"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, Hammer, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Choose Your Project",
    description: "Select from mosques, schools, community centers, water facilities, or custom projects.",
    color: "from-primary to-accent",
  },
  {
    number: "02",
    icon: Hammer,
    title: "We Build & Monitor",
    description: "Our trusted teams handle construction with regular updates and full transparency.",
    color: "from-teal to-primary",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Impact Delivered",
    description: "Receive completion reports with photos, GPS coordinates, and lasting impact.",
    color: "from-gold to-teal",
  },
]

export function HowItWorksPreview() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight
        setScrollY(scrollProgress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-teal to-accent bg-clip-text text-transparent">
                Simple, Transparent Process
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-primary via-teal to-accent rounded-full mt-2" />
            </div>
            <p className="text-base md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              From vision to reality in three clear steps
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isVisible = visibleSteps.includes(index)

              return (
                <Card
                  key={index}
                  className={`p-6 md:p-8 bg-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-primary/30 group relative overflow-hidden ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transform:
                      isVisible && window.innerWidth > 768 ? `translateY(${scrollY * (index - 1) * 10}px)` : undefined,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="space-y-3 md:space-y-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <span
                        className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-30`}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`}
                  />
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 group bg-gradient-to-r from-primary to-teal text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95"
              asChild
            >
              <Link href="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
