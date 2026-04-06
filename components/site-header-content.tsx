"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { Link } from "@/lib/navigation"
import { usePathname } from "@/lib/navigation"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const defaultNavigation = (t: any) => [
  { name: t("about"), href: "/about" },
  { name: t("whatWeBuild"), href: "/what-we-build" },
  { name: t("howItWorks"), href: "/how-it-works" },
  { name: t("impact"), href: "/impact" },
  { name: t("resources"), href: "/blog" },
  { name: t("contact"), href: "/contact" },
]

export function SiteHeaderContent({ config }: { config: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('navigation');
  const th = useTranslations('home.hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const headerConfig = config?.header || {}
  const navLinks = headerConfig.navLinks?.length > 0 ? headerConfig.navLinks : defaultNavigation(t)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-primary/5 h-16 md:h-20"
          : "bg-transparent h-20 md:h-24"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg md:rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm overflow-hidden">
                {headerConfig.logoUrl ? (
                  <Image src={headerConfig.logoUrl} alt={headerConfig.logoAlt || headerConfig.brandName} width={48} height={48} className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="bg-primary w-full h-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg md:text-2xl leading-tight text-brand-deep tracking-tight group-hover:text-primary transition-colors">
                {headerConfig.brandName || th("brand")}
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 font-bold leading-tight tracking-[0.1em] hidden sm:block uppercase">
                {headerConfig.tagline || th("tagline")}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item: any) => {
              const label = item.label || item.name
              const isActive = pathname === item.href
              return (
                <Link
                  key={label}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-slate-600 hover:text-brand-deep hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-primary rounded-full" />
                  )}
                  <span className="relative">{label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <CartDrawer />
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-white shadow-xl shadow-primary/20 hover:scale-105 rounded-2xl px-6 py-6 font-bold transition-all duration-300"
              asChild
            >
              <Link href="/start-project">
                {t("startProject")}
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <CartDrawer />
            <button
              className="p-3 rounded-md hover:bg-accent transition-colors active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex justify-between items-center px-4 mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Select Language</span>
              <LanguageSwitcher />
            </div>
            {navLinks.map((item: any) => {
              const label = item.label || item.name
              const isActive = pathname === item.href
              return (
                <Link
                  key={label}
                  href={item.href}
                  className={`px-4 py-4 rounded-2xl text-lg font-black tracking-tight transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-white shadow-xl shadow-primary/20 mt-6 w-full py-8 text-lg font-bold rounded-2xl active:scale-95"
              asChild
            >
              <Link href="/start-project" onClick={() => setIsMobileMenuOpen(false)}>
                {t("startProject")}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
