import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { School, Building2, Droplets, Home, Users, Plus } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "What We Build | Infrastructure for Lasting Impact",
  description:
    "Discover the types of charity construction projects we manage: mosques, schools, community centers, water facilities, shelters, and more.",
}

const projects = [
  {
    icon: Building2,
    title: "Mosques",
    description:
      "Build places of worship that serve as spiritual centers for entire communities, creating spaces for prayer, learning, and gathering.",
    benefits: [
      "Complete architectural planning and design",
      "Prayer halls, ablution facilities, and courtyards",
      "Quality construction built to last generations",
      "Integration with community needs",
    ],
    impact: "Ongoing spiritual benefit (Sadaqah Jariyah) for donors and vital community infrastructure",
    image: "/beautiful-mosque-architecture.jpg",
  },
  {
    icon: School,
    title: "Schools & Educational Facilities",
    description:
      "Create learning environments that transform lives, providing access to quality education for children and adults.",
    benefits: [
      "Classrooms designed for effective learning",
      "Libraries and resource centers",
      "Safe, accessible facilities",
      "Teacher accommodation when needed",
    ],
    impact: "Education for hundreds of students annually, breaking cycles of poverty for entire communities",
    image: "/modern-school-exterior.png",
  },
  {
    icon: Users,
    title: "Community Centers",
    description:
      "Build gathering spaces that strengthen community bonds, host events, provide services, and foster development.",
    benefits: [
      "Multi-purpose halls for gatherings",
      "Meeting rooms and offices",
      "Kitchen and dining facilities",
      "Flexible spaces for various community needs",
    ],
    impact: "Hub for community development, job training, health clinics, and social programs",
    image: "/community-center.png",
  },
  {
    icon: Droplets,
    title: "Water & Sanitation Projects",
    description:
      "Provide essential access to clean water through wells, pumps, filtration systems, and sanitation facilities.",
    benefits: [
      "Deep water wells with quality pumps",
      "Solar-powered water systems",
      "Water filtration and purification",
      "Sanitation facilities and hygiene education",
    ],
    impact: "Clean water access for hundreds or thousands, preventing disease and transforming daily life",
    image: "/water-well-facility.jpg",
  },
  {
    icon: Home,
    title: "Shelters & Housing",
    description:
      "Create safe, dignified housing for families displaced by crisis or living in poverty, providing stability and hope.",
    benefits: [
      "Durable, weather-resistant construction",
      "Basic amenities and utilities",
      "Community infrastructure planning",
      "Sustainable building materials",
    ],
    impact: "Safe homes for displaced families, providing security, dignity, and foundation for rebuilding",
    image: "/shelter-housing-buildings.jpg",
  },
]

export default function WhatWeBuildPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Infrastructure for <span className="text-primary">Lasting Impact</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                From spiritual centers to educational facilities, we build infrastructure that serves communities for
                generations
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-24">
              {projects.map((project, index) => {
                const Icon = project.icon
                const isEven = index % 2 === 0

                return (
                  <div
                    key={index}
                    className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Image */}
                    <div className={`${!isEven ? "md:order-2" : ""}`}>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted shadow-xl">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`space-y-6 ${!isEven ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">{project.title}</h2>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">What's Included:</h3>
                        <ul className="space-y-2">
                          {project.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Card className="p-6 bg-secondary/50 border-primary/20">
                        <p className="font-semibold text-sm text-primary mb-2">LASTING IMPACT</p>
                        <p className="text-foreground leading-relaxed">{project.impact}</p>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Custom Projects */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-12 bg-card text-center space-y-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Custom Projects</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Have a specific project in mind? We can help plan and execute custom charity construction projects
                tailored to your vision and the community's needs.
              </p>
              <Button size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-8 py-6" asChild>
                <Link href="/start-project">Discuss Your Custom Project</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Build Lasting Impact?</h2>
              <p className="text-xl leading-relaxed text-balance opacity-90">
                Start your charity construction project today and create infrastructure that transforms communities for
                generations to come
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                  <Link href="/start-project">Start a Project</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-primary-foreground/20 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
                  asChild
                >
                  <Link href="/how-it-works">Learn How It Works</Link>
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
