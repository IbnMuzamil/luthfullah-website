"use client"

import { Card } from "@/components/ui/card"
import { School, Building2, Droplets, Home, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    icon: Building2,
    title: "Mosques",
    description: "Places of worship that serve as spiritual centers for entire communities.",
    image: "/beautiful-mosque-architecture.jpg",
    color: "from-primary to-accent",
    gradient: "bg-gradient-to-br from-primary/20 to-accent/20",
  },
  {
    icon: School,
    title: "Schools",
    description: "Educational facilities that transform lives and build future generations.",
    image: "/modern-school-building.png",
    color: "from-teal to-primary",
    gradient: "bg-gradient-to-br from-teal/20 to-primary/20",
  },
  {
    icon: Users,
    title: "Community Centers",
    description: "Gathering spaces that strengthen bonds and foster community development.",
    image: "/community-center-facility.jpg",
    color: "from-accent to-teal",
    gradient: "bg-gradient-to-br from-accent/20 to-teal/20",
  },
  {
    icon: Droplets,
    title: "Water & Sanitation",
    description: "Essential infrastructure providing clean water access to communities in need.",
    image: "/water-well-facility.jpg",
    color: "from-gold to-primary",
    gradient: "bg-gradient-to-br from-gold/20 to-primary/20",
  },
  {
    icon: Home,
    title: "Shelters",
    description: "Safe housing for families displaced by crisis or living in poverty.",
    image: "/shelter-housing-building.jpg",
    color: "from-primary to-gold",
    gradient: "bg-gradient-to-br from-primary/20 to-gold/20",
  },
]

export function WhatWeBuildSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-secondary/10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance bg-gradient-to-r from-gold via-primary to-teal bg-clip-text text-transparent">
                What We Build
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-gold via-primary to-teal rounded-full mt-2 animate-shimmer" />
            </div>
            <p className="text-base md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Infrastructure that creates lasting positive change across generations
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon
              const isVisible = visibleCards.includes(index)
              const isHovered = hoveredCard === index

              return (
                <Card
                  key={index}
                  className={`group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer border-2 hover:border-primary/30 relative ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform:
                      isVisible && isHovered && window.innerWidth > 768 ? "translateY(-8px) rotateX(2deg)" : undefined,
                  }}
                >
                  <div
                    className={`absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none`}
                  />

                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} - Luthfullah charity construction project`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                    />
                  </div>

                  <div className="p-5 md:p-6 space-y-3 relative z-20">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.description}</p>

                    <div
                      className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-500`}
                    />
                  </div>

                  <div
                    className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-all duration-500`}
                  />
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
