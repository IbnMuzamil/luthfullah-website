import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Impact & Transparency", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ],
  projects: [
    { name: "Mosques", href: "/what-we-build#mosques" },
    { name: "Schools", href: "/what-we-build#schools" },
    { name: "Community Centers", href: "/what-we-build#community-centers" },
    { name: "Water & Sanitation", href: "/what-we-build#water" },
    { name: "Shelters", href: "/what-we-build#shelters" },
  ],
  resources: [
    { name: "Blog & Resources", href: "/blog" },
    { name: "Sadaqah Jariyah Guide", href: "/blog/understanding-sadaqah-jariyah" },
    { name: "Project Cost Breakdown", href: "/blog/true-cost-building-mosque" },
    { name: "FAQ", href: "/contact#faq" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 md:space-y-6">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-rose-400 to-purple-500 rounded-lg md:rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl leading-tight bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                  Luthfullah
                </span>
                <span className="text-xs md:text-sm text-slate-400 leading-tight tracking-wide">
                  Building Hope Together
                </span>
              </div>
            </Link>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-sm">
              Helping individuals, families, and organizations build lasting infrastructure that transforms communities
              through transparent, trusted charity construction.
            </p>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@luthfullah.org" className="hover:text-amber-300 transition-colors break-all">
                  info@luthfullah.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <Phone className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <a href="tel:+1-555-CHARITY" className="hover:text-rose-300 transition-colors">
                  +1 (555) CHARITY
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>New York, NY 10001</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </a>
              <a
                href="#"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </a>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-base text-white/80 hover:text-transparent hover:bg-gradient-to-r hover:from-amber-400 hover:to-rose-400 hover:bg-clip-text transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">What We Build</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-base text-white/80 hover:text-transparent hover:bg-gradient-to-r hover:from-rose-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Resources</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-base text-white/80 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 hover:bg-clip-text transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5">
          <div className="max-w-xl space-y-4 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-amber-400 flex-shrink-0" />
              <h3 className="font-semibold text-base md:text-lg text-white">Stay Updated</h3>
            </div>
            <p className="text-sm md:text-base text-white/80">
              Get insights on charity construction, project updates, and impact stories delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-400/50 h-11 md:h-12"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 h-11 md:h-12 active:scale-95"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/70">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Luthfullah. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors whitespace-nowrap">
                Terms of Service
              </Link>
              <Link href="/transparency" className="hover:text-white transition-colors whitespace-nowrap">
                Financial Transparency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
