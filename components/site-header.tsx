"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = [
  { name: "About", href: "/about" },
  { name: "What We Build", href: "/what-we-build" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Impact", href: "/impact" },
  { name: "Resources", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-primary/5"
          : "bg-gradient-to-b from-white/50 to-transparent dark:from-slate-950/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-rose-400 to-purple-500 rounded-lg md:rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-2xl leading-tight bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                Luthfullah
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight tracking-wide hidden sm:block">
                Building Hope Together
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-transparent bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-lg" />
                  )}
                  <span className="relative">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/start-project">
                <Sparkles className="w-4 h-4 mr-2" />
                Start a Project
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-3 rounded-md hover:bg-accent transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-primary/10 animate-in slide-in-from-top-4 duration-300">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 text-transparent bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text"
                      : "text-foreground/80 hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 mt-4 w-full py-6 text-base active:scale-95"
              asChild
            >
              <Link href="/start-project" onClick={() => setIsMobileMenuOpen(false)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Start a Project
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
