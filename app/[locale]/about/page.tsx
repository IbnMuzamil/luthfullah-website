import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pages, config } from "@/lib/db"
import { DynamicIcon } from "@/components/dynamic-icon"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await config.get()
  const pageData = await pages.getPage("about")
  
  return {
    title: `${pageData?.headline || "About Us"} | ${siteConfig.header?.brandName || "Luthfullah"}`,
    description: pageData?.subheadline || "Learn about our mission to make charity construction transparent, frugal, and impactful.",
  }
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  
  const data = {
    headline: t("headline"),
    subheadline: t("subheadline"),
    mission: { title: t("mission.title"), content: t("mission.content") },
    vision: { title: t("vision.title"), content: t("vision.content") },
    values: [], 
    approach: []
  }

  // ... (rest of the component using data)

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                {data.headline.split(' ').map((word: string, i: number) => 
                  word === "Impact" ? <span key={i} className="text-primary"> {word}</span> : <span key={i}> {word}</span>
                )}
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                {data.subheadline}
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
                  <DynamicIcon name="Target" className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{data.mission?.title || "Our Mission"}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.mission?.content}
                </p>
              </Card>

              <Card className="p-10 bg-card space-y-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DynamicIcon name="Eye" className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{data.vision?.title || "Our Vision"}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.vision?.content}
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
                {data.values?.map((value: any, index: number) => (
                  <Card key={index} className="p-8 bg-card space-y-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DynamicIcon name={value.icon} className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.content}
                    </p>
                  </Card>
                ))}
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

              {data.approach?.map((item: any, index: number) => (
                <Card key={index} className="p-10 bg-card space-y-6">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </Card>
              ))}
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
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
