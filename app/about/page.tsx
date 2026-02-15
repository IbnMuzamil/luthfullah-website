import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Target, Eye, Heart, Shield, Users, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About Us | Our Mission & Values",
  description:
    "Learn about our mission to make charity construction transparent, frugal, and impactful. Discover our values and commitment to lasting community development.",
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Building Trust, Delivering <span className="text-primary">Impact</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                We exist to transform charitable intentions into real, completed infrastructure that serves communities
                for generations to come.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <Card className="p-10 bg-card space-y-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To simplify charity construction by managing end-to-end projects for donors, ensuring every dollar is
                  used wisely, transparently, and effectively to create lasting infrastructure that transforms
                  communities.
                </p>
              </Card>

              <Card className="p-10 bg-card space-y-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A world where charitable construction is trusted, accessible, and impactful - where every donor can
                  confidently build infrastructure that creates opportunity, dignity, and lasting change for
                  generations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">Our Values</h2>
                <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                  The principles that guide every project we build
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Transparency</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete visibility into costs, progress, and impact. Every donor receives detailed reporting with
                    photos, GPS coordinates, and financial breakdowns.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Frugality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We minimize costs without compromising quality, ensuring maximum impact from every donation through
                    careful planning and local partnerships.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Community Focus</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We work closely with local communities to ensure projects meet real needs and create lasting
                    positive change beyond the initial construction.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Quality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We build to last. Every structure is designed and constructed to serve communities for decades,
                    withstanding local conditions and growing needs.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Accountability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We take full responsibility for every project from planning to completion, with clear milestones and
                    regular updates throughout the journey.
                  </p>
                </Card>

                <Card className="p-8 bg-card space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Compassion</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We approach every project with empathy and understanding, honoring the faith-driven intentions of
                    our donors and the dignity of the communities we serve.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Operating Model */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">Our Approach</h2>
                <p className="text-xl text-muted-foreground">Frugal, transparent, and committed for the long-term</p>
              </div>

              <Card className="p-10 bg-card space-y-6">
                <h3 className="text-2xl font-semibold">Frugal Operations</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We keep overhead costs minimal by leveraging technology, building strong local partnerships, and
                  focusing on efficient project management. This means more of your donation goes directly to
                  construction and impact, not administration.
                </p>
              </Card>

              <Card className="p-10 bg-card space-y-6">
                <h3 className="text-2xl font-semibold">Complete Transparency</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every donor receives detailed project reports including itemized budgets, construction timelines,
                  milestone updates with photos, GPS coordinates of completed projects, and post-completion impact
                  assessments. You'll always know exactly where your donation went and the impact it created.
                </p>
              </Card>

              <Card className="p-10 bg-card space-y-6">
                <h3 className="text-2xl font-semibold">Long-Term Partnership</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We don't disappear after construction. We maintain relationships with communities to ensure facilities
                  are well-maintained and continue serving their intended purpose. Our commitment extends beyond project
                  completion to lasting impact.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Why We Exist</h2>
              <p className="text-xl leading-relaxed text-balance opacity-90">
                Too many donors want to build lasting charitable projects but struggle with complexity, uncertain costs,
                and lack of transparency. We exist to remove these barriers - making it simple, trustworthy, and
                accessible for anyone to fund infrastructure that transforms communities for generations.
              </p>
              <p className="text-xl leading-relaxed text-balance opacity-90">
                Whether you want to build a mosque as Sadaqah Jariyah, fund a school in your ancestral village, or
                create a water facility for a community in need - we're here to make it happen with complete trust and
                transparency.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
