"use client"

import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import Image from 'next/image'

export function SiteFooterContent({ config }: { config: any }) {
  const t = useTranslations()
  const footerConfig = config?.footer || {}
  const contactInfo = config?.contactInfo || {}
  const headerConfig = config?.header || {}

  const defaultFooterLinks = {
    company: [
      { name: t("navigation.about"), href: "/about" },
      { name: t("navigation.howItWorks"), href: "/how-it-works" },
      { name: t("navigation.impact"), href: "/impact" },
      { name: t("navigation.contact"), href: "/contact" },
    ],
    sectors: [
      { name: "Mosques", href: "/what-we-build#mosques" },
      { name: "Schools", href: "/what-we-build#schools" },
      { name: "Iftar Relief", href: "/what-we-build#iftar" },
      { name: "Eid al-Adha Projects", href: "/what-we-build#adha" },
      { name: "Community Centers", href: "/what-we-build#community-centers" },
      { name: "Water & Sanitation", href: "/what-we-build#water" },
      { name: "Shelters", href: "/what-we-build#shelters" },
    ],
    resources: [
      { name: t("navigation.resources"), href: "/blog" },
      { name: "Sadaqah Jariyah Guide", href: "/blog/understanding-sadaqah-jariyah" },
      { name: "Project Cost Breakdown", href: "/blog/true-cost-building-mosque" },
      { name: "FAQ", href: "/contact#faq" },
    ],
  }

  return (
    <footer className="relative bg-brand-deep border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-2 md:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg md:rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-white border border-slate-800 flex items-center justify-center shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                {headerConfig.logoUrl ? (
                  <Image src={headerConfig.logoUrl} alt={headerConfig.logoAlt || headerConfig.brandName} width={56} height={56} className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="bg-primary w-full h-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl leading-tight text-white tracking-tight">
                {headerConfig.brandName || t("home.hero.brand")}
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 font-bold leading-tight tracking-[0.1em] uppercase">
                {headerConfig.tagline || t("home.hero.tagline")}
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-sm font-medium">
            {t("footer.description")}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm md:text-base text-slate-300 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-4 h-4 text-primary group-hover:text-white" />
              </div>
              <a href={`mailto:${contactInfo.email || "info@luthfullah.org"}`} className="hover:text-primary transition-colors font-medium">
                {contactInfo.email || "info@luthfullah.org"}
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm md:text-base text-slate-300 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-4 h-4 text-primary group-hover:text-white" />
              </div>
              <a href={`tel:${contactInfo.phone || "+1-555-CHARITY"}`} className="hover:text-primary transition-colors font-medium">
                {contactInfo.phone || "+1 (555) CHARITY"}
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm md:text-base text-slate-300 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                <MapPin className="w-4 h-4 text-primary group-hover:text-white" />
              </div>
              <span className="font-medium">{contactInfo.address || "New York, NY 10001"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/50">{t("footer.company")}</h3>
          <ul className="space-y-3">
            {defaultFooterLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm md:text-base text-slate-400 hover:text-primary transition-all duration-300 font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/50">{t("footer.sectors")}</h3>
          <ul className="space-y-3">
            {defaultFooterLinks.sectors.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm md:text-base text-slate-400 hover:text-primary transition-all duration-300 font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/50">{t("footer.resources")}</h3>
          <ul className="space-y-3">
            {defaultFooterLinks.resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm md:text-base text-slate-400 hover:text-primary transition-all duration-300 font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm">
            <p className="text-slate-500 font-bold uppercase tracking-widest">{t("footer.copyright")}</p>
            <div className="flex gap-8">
              {(footerConfig.links || []).map((link: any) => (
                <Link key={link.label} href={link.href} className="text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
