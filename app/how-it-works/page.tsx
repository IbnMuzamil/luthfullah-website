"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ClipboardCheck,
  Search,
  MessageSquare,
  FileText,
  Hammer,
  Camera,
  Bell,
  CheckCircle2,
  MapPin,
  Award,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const detailedSteps = [
  {
    phase: "Phase 1: Planning & Selection",
    steps: [
      {
        icon: Search,
        title: "Choose Your Project Type",
        description:
          "Select from mosques, schools, community centers, water facilities, or tell us about your custom vision. We'll help match your goals to community needs.",
      },
      {
        icon: MessageSquare,
        title: "Initial Consultation",
        description:
          "Our team discusses your vision, budget, timeline, and any specific requirements. This is a collaborative conversation to ensure we understand exactly what you want to achieve.",
      },
      {
        icon: FileText,
        title: "Detailed Proposal",
        description:
          "We provide a comprehensive project proposal including: itemized budget breakdown, architectural plans, construction timeline, site location and assessment, and expected community impact.",
      },
      {
        icon: ClipboardCheck,
        title: "Approval & Agreement",
        description:
          "Review the proposal, ask questions, and once you're fully satisfied, we formalize the agreement and set the project timeline.",
      },
    ],
  },
  {
    phase: "Phase 2: Construction & Monitoring",
    steps: [
      {
        icon: Hammer,
        title: "Construction Begins",
        description:
          "Our trusted local teams start building according to approved plans, using quality materials and skilled craftspeople to ensure lasting results.",
      },
      {
        icon: Camera,
        title: "Regular Photo Updates",
        description:
          "Receive regular photo updates showing construction progress at key milestones. You'll see your project taking shape in real-time.",
      },
      {
        icon: Bell,
        title: "Milestone Notifications",
        description:
          "Get notified when major milestones are completed: foundation, walls, roofing, finishing work. Each milestone includes detailed progress reports.",
      },
      {
        icon: MessageSquare,
        title: "Direct Communication",
        description:
          "Stay in touch with our project managers throughout construction. Ask questions, request additional photos, or discuss any adjustments needed.",
      },
    ],
  },
  {
    phase: "Phase 3: Completion & Impact",
    steps: [
      {
        icon: CheckCircle2,
        title: "Final Inspection",
        description:
          "Thorough inspection to ensure quality standards are met and all aspects of the project are completed as planned.",
      },
      {
        icon: Award,
        title: "Completion Report",
        description:
          "Receive comprehensive completion documentation including: final photos and video walkthrough, GPS coordinates, detailed financial report, and community testimonials.",
      },
      {
        icon: MapPin,
        title: "Long-Term Impact",
        description:
          "We maintain relationships with communities to monitor ongoing impact and ensure facilities continue serving their intended purpose for years to come.",
      },
    ],
  },
]

export default function HowItWorksPage() {
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
  }, [])

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                From Vision to <span className="text-primary">Reality</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                A clear, transparent process that takes you from initial idea to completed infrastructure - with full
                visibility every step of the way
              </p>
            </div>
          </div>
        </section>

        {/* Overview Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ClipboardCheck className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">01</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Plan & Design</h3>
                  <p className="text-muted-foreground">Choose project, review proposal, approve budget and timeline</p>
                </Card>

                <Card className="p-8 bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Hammer className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">02</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Build & Monitor</h3>
                  <p className="text-muted-foreground">
                    Construction begins with regular photo updates and milestone reports
                  </p>
                </Card>

                <Card className="p-8 bg-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">03</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Complete & Impact</h3>
                  <p className="text-muted-foreground">
                    Receive full documentation and watch lasting community transformation
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-20">
              {detailedSteps.map((phase, phaseIndex) => (
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
                    {phase.steps.map((step, stepIndex) => {
                      const Icon = step.icon
                      return (
                        <Card
                          key={stepIndex}
                          className="p-6 bg-card hover:shadow-lg transition-shadow"
                          style={{
                            transitionDelay: `${stepIndex * 100}ms`,
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">{step.title}</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
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
                Built on <span className="text-primary">Trust & Transparency</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 bg-card space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Complete Documentation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every project includes itemized budgets, construction contracts, material receipts, and detailed
                    financial reporting. You'll always know exactly where your donation went.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Visual Proof</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Regular photo and video updates throughout construction, plus final walkthrough documentation with
                    GPS coordinates so you can verify the exact location.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Direct Communication</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Always have access to our project managers. Ask questions, request updates, or discuss concerns
                    anytime throughout the project lifecycle.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We build to last. Every structure is designed and constructed to serve communities for decades, with
                    quality materials and skilled local craftspeople.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Start Your Project?</h2>
              <p className="text-xl leading-relaxed text-balance opacity-90">
                Join hundreds of donors who have built lasting impact through our transparent, trusted process
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group" asChild>
                  <Link href="/start-project">
                    Start a Charity Project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
                  asChild
                >
                  <Link href="/impact">See Our Impact</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
