import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, DollarSign, Camera, FileText } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Our Impact & Transparency | See Real Results",
  description:
    "Explore our completed projects, financial transparency, and the lasting community impact we've created together with donors worldwide.",
}

const completedProjects = [
  {
    title: "Al-Noor Community Mosque",
    type: "Mosque",
    location: "Nairobi, Kenya",
    completedDate: "December 2025",
    budget: "$45,000",
    beneficiaries: "500+ families",
    description:
      "A beautiful community mosque serving 5 daily prayers with dedicated spaces for education and community gatherings. Features include prayer hall, ablution facilities, library, and open courtyard.",
    image: "/completed-mosque-kenya.jpg",
    impact: "Serves as spiritual center for entire neighborhood, hosts Quran classes for 80+ children weekly",
  },
  {
    title: "Hope Primary School",
    type: "School",
    location: "Dhaka, Bangladesh",
    completedDate: "November 2025",
    budget: "$68,000",
    beneficiaries: "250 students",
    description:
      "Modern primary school with 8 classrooms, library, computer lab, and playground. Built to provide quality education to underserved community with focus on girls' education.",
    image: "/completed-school-bangladesh.jpg",
    impact: "250 students enrolled in first year, 60% girls. Free education and lunch program implemented",
  },
  {
    title: "Clean Water Initiative",
    type: "Water",
    location: "Tigray, Ethiopia",
    completedDate: "October 2025",
    budget: "$22,000",
    beneficiaries: "1,200+ people",
    description:
      "Deep water well with solar-powered pump system providing clean drinking water to remote village. Includes storage tank and distribution points.",
    image: "/completed-water-ethiopia.jpg",
    impact: "Eliminated 3-hour daily water collection trips, reduced waterborne diseases by 75% in first 6 months",
  },
]

const impactStats = [
  { label: "Projects Completed", value: "250+", change: "+42 this year" },
  { label: "Countries Served", value: "45", change: "Across 4 continents" },
  { label: "People Benefiting", value: "180K+", change: "And growing daily" },
  { label: "Total Investment", value: "$12M+", change: "100% to projects" },
  { label: "Average Project Cost", value: "$48K", change: "Below industry avg" },
  { label: "Completion Rate", value: "100%", change: "Every project delivered" },
]

export default function ImpactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Real Projects, <span className="text-primary">Real Impact</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Complete transparency into our work, financial reporting, and the lasting community transformation we're
                creating together
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                {impactStats.map((stat, index) => (
                  <Card key={index} className="p-6 bg-card text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm font-medium">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.change}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Completed Projects */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">Recent Completed Projects</h2>
                <p className="text-xl text-muted-foreground">See the infrastructure we've built together</p>
              </div>

              <div className="space-y-12">
                {completedProjects.map((project, index) => (
                  <Card key={index} className="overflow-hidden bg-card">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto bg-muted">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 space-y-6">
                        <div>
                          <Badge className="mb-3">{project.type}</Badge>
                          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{project.completedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span>{project.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{project.beneficiaries}</span>
                          </div>
                        </div>

                        <Card className="p-4 bg-primary/5 border-primary/20">
                          <p className="text-sm font-semibold text-primary mb-1">IMPACT ACHIEVED</p>
                          <p className="text-sm">{project.impact}</p>
                        </Card>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">See more of our 250+ completed projects</p>
                <Button variant="outline" size="lg" className="border-2 bg-transparent" asChild>
                  <Link href="/start-project">View Full Project Gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Transparency */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="text-primary">100%</span> Transparent
                </h2>
                <p className="text-xl text-muted-foreground">Every dollar accounted for and reported</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Fund Usage Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Direct Construction Costs</span>
                      <span className="font-semibold">82%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }} />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">On-Ground Team & Monitoring</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "12%" }} />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Operations & Administration</span>
                      <span className="font-semibold">6%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "6%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Industry average admin costs: 15-25%. We keep it minimal.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">What You Receive</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Regular photo/video updates throughout construction
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Itemized budget with all receipts and invoices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        GPS coordinates and final walkthrough documentation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Community testimonials and impact assessments
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Annual impact reports on ongoing project benefit
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Be Part of This Impact</h2>
              <p className="text-xl leading-relaxed text-balance opacity-90">
                Join hundreds of donors creating lasting infrastructure that transforms communities
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/start-project">Start Your Charity Project</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
