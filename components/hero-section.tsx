import { pages } from "@/lib/db"
import { HeroContent } from "./hero-content"

export async function HeroSection({ data }: { data?: any }) {
  // If data isn't passed, fetch it from DB
  const heroData = data || (await pages.getPage("index"))?.hero

  return <HeroContent data={heroData} />
}
