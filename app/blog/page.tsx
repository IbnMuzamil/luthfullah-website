import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Resources & Insights | Charity Construction Blog",
  description:
    "Learn about charity construction, Sadaqah Jariyah, community development, and creating lasting impact through infrastructure projects.",
}

const articles = [
  {
    title: "Understanding Sadaqah Jariyah: The Gift That Keeps Giving",
    slug: "understanding-sadaqah-jariyah",
    excerpt:
      "Explore the Islamic concept of ongoing charity and why building infrastructure like mosques, schools, and wells creates lasting spiritual benefit for donors.",
    category: "Islamic Giving",
    author: "Dr. Sarah Ahmed",
    date: "January 2, 2026",
    readTime: "8 min read",
    image: "/blog-sadaqah-jariyah.jpg",
  },
  {
    title: "How to Choose the Right Charity Construction Project",
    slug: "choosing-right-charity-project",
    excerpt:
      "A comprehensive guide to deciding which type of infrastructure project aligns with your goals, budget, and desired community impact.",
    category: "Planning",
    author: "Michael Chen",
    date: "December 28, 2025",
    readTime: "12 min read",
    image: "/blog-choosing-project.jpg",
  },
  {
    title: "The True Cost of Building a Mosque: Transparent Breakdown",
    slug: "true-cost-building-mosque",
    excerpt:
      "Detailed financial analysis of mosque construction costs across different regions, with itemized budgets and cost-saving strategies.",
    category: "Financial Transparency",
    author: "Hassan Ibrahim",
    date: "December 20, 2025",
    readTime: "10 min read",
    image: "/blog-mosque-costs.jpg",
  },
  {
    title: "Water Wells That Last: Engineering for Long-Term Impact",
    slug: "engineering-lasting-water-wells",
    excerpt:
      "Technical insights into designing and constructing water infrastructure that serves communities reliably for decades.",
    category: "Technical",
    author: "Dr. Fatima Osman",
    date: "December 15, 2025",
    readTime: "6 min read",
    image: "/blog-water-wells.jpg",
  },
  {
    title: "Community-Centered Design: Why Local Input Matters",
    slug: "community-centered-design",
    excerpt:
      "How involving local communities in project planning ensures infrastructure meets real needs and creates lasting adoption.",
    category: "Community Development",
    author: "Ahmed Nasser",
    date: "December 10, 2025",
    readTime: "7 min read",
    image: "/blog-community-design.jpg",
  },
  {
    title: "From Urban to Rural: Adapting Projects to Local Contexts",
    slug: "adapting-projects-local-contexts",
    excerpt:
      "Understanding how geography, climate, and local culture influence construction decisions and project success.",
    category: "Planning",
    author: "Aisha Mohammed",
    date: "December 5, 2025",
    readTime: "9 min read",
    image: "/blog-urban-rural.jpg",
  },
]

const categories = ["All", "Islamic Giving", "Planning", "Financial Transparency", "Technical", "Community Development"]

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Resources & <span className="text-primary">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Learn about charity construction, sustainable impact, and creating infrastructure that transforms
                communities
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className="px-4 py-2 cursor-pointer"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden bg-card hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto bg-muted overflow-hidden">
                    <img
                      src={articles[0].image || "/placeholder.svg"}
                      alt={articles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
                    <Badge className="self-start">{articles[0].category}</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-balance group-hover:text-primary transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{articles[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{articles[0].date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{articles[0].readTime}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${articles[0].slug}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(1).map((article, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-card hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <Badge>{article.category}</Badge>
                      <h3 className="text-xl font-semibold text-balance group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-primary font-semibold group-hover:gap-3 transition-all"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
