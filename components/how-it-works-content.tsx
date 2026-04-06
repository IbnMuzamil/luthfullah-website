"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "@/lib/navigation"
import { useEffect, useRef, useState } from "react"
import { DynamicIcon } from "@/components/dynamic-icon"

interface HowItWorksContentProps {
  data: any
}

export function HowItWorksContent({ data }: HowItWorksContentProps) {
  const [visiblePhases, setVisiblePhases] = useState<number[]>([])
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    phaseRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisiblePhases((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [data.detailedSteps])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              {data.headline}
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              {data.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {data.detailedSteps?.map((phase: any, index: number) => (
                <Card key={index} className="p-8 bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DynamicIcon name={phase.steps[0].icon} className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{phase.overviewTitle || phase.phase}</h3>
                  <p className="text-muted-foreground">{phase.overviewDescription || phase.steps?.[0]?.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            {data.detailedSteps?.map((phase: any, phaseIndex: number) => (
              <div
                key={phaseIndex}
                ref={(el) => {
                  phaseRefs.current[phaseIndex] = el
                }}
                className={`transition-all duration-700 ${
                  visiblePhases.includes(phaseIndex) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mb-12">
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
                    {phase.phase}
                  </div>
                  <div className="w-full h-1 bg-primary/20 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {phase.steps.map((step: any, stepIndex: number) => (
                    <Card
                      key={stepIndex}
                      className="p-6 bg-card hover:shadow-lg transition-shadow"
                      style={{
                        transitionDelay: `${stepIndex * 100}ms`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={step.icon} className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-lg">{step.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Reassurance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {data.trustHeadingPrefix} <span className="text-primary">{data.trustHeadingHighlight}</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {data.trustPoints?.map((point: any, index: number) => (
                <Card key={index} className="p-8 bg-card space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DynamicIcon name={point.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">{data.ctaTitle}</h2>
            <p className="text-xl leading-relaxed text-balance opacity-90">
              {data.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group" asChild>
                <Link href="/start-project">
                  {data.ctaPrimaryLabel}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
                asChild
              >
                <Link href="/impact">{data.ctaSecondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
