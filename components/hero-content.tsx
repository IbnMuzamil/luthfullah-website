"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles } from "lucide-react"
import { Link } from "@/lib/navigation"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function HeroContent({ data }: { data: any }) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const t = useTranslations('home.hero');
  const ts = useTranslations('home.stats');

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    const particleCount = window.innerWidth < 768 ? 15 : 30
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsla(${200 + Math.random() * 60}, 70%, 60%, 0.6)`,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,82,255,0.03),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,209,255,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div
        className="absolute top-20 left-4 md:left-10 w-32 md:w-64 h-32 md:h-64 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />
      <div
        className="absolute bottom-20 right-4 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s", transform: `translateY(${scrollY * -0.15}px)` }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            {/* Trust badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs md:text-sm font-bold tracking-wide transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
              <span>{t("badgeText")}</span>
            </div>

            {/* Brand name with staggered animation */}
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-xl md:text-2xl font-black tracking-[0.3em] mb-2 text-brand-deep uppercase flex flex-wrap">
                {t("brand").split("").map((char: string, i: number) => (
                  <span
                    key={i}
                    className="inline-block transition-all duration-[800ms] cubic-bezier(0.2, 0, 0.2, 1)"
                    style={{
                      transitionDelay: `${300 + i * 40}ms`,
                      transform: isVisible ? "translateY(0) rotateX(0)" : "translateY(100%) rotateX(-90deg)",
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
              <div 
                className={`h-1.5 bg-primary rounded-full transition-all duration-1000 delay-1000 ${isVisible ? "w-20 opacity-100" : "w-0 opacity-0"}`} 
              />
            </div>

            {/* Main headline */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-brand-deep leading-[1.1] tracking-tighter transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t("headline")}{" "}
              <span className="text-primary">
                {t("headlineHighlight")}
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg md:text-xl lg:text-2xl text-slate-600 max-w-xl leading-relaxed transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t("subheadline")}
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-4 pt-4 transition-all duration-700 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-7 rounded-2xl group shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto font-bold"
                asChild
              >
                <Link href="/start-project">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-7 border-2 border-slate-200 text-brand-deep hover:bg-slate-50 rounded-2xl w-full sm:w-auto font-bold transition-all"
                asChild
              >
                <Link href="/how-it-works">{t("ctaSecondary")}</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className={`grid grid-cols-3 gap-4 md:gap-6 pt-8 transition-all duration-700 delay-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { value: "250+", label: ts("projects") },
                { value: "45", label: ts("countries") },
                { value: "100%", label: ts("transparent") }
              ].map((stat: any, i: number) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-primary tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative mt-12 lg:mt-0 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"
            }`}
              style={{
                transform:
                  windowWidth > 768 ? `translateY(${scrollY * -0.1}px)` : undefined,
              }}
          >
            {/* 2026 Floating Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] animate-pulse" />
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,82,255,0.2)] border-[8px] border-white bg-white">
              <Image
                src={data?.imageUrl || "/beautiful-mosque-architecture.jpg"}
                alt="Luthfullah project"
                width={800}
                height={1000}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />

              <div className="absolute top-6 right-6 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white shadow-xl flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-brand-deep uppercase tracking-widest">Live Impact</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-brand-deep/90 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-lg tracking-tight">Sadaqah Jariyah</div>
                    <div className="text-primary-100/70 text-sm font-medium">Continuous charity for generations</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -right-8 top-20 bg-white rounded-3xl p-6 shadow-2xl border border-slate-50 animate-float">
              <div className="text-primary font-black text-3xl tracking-tighter">250+</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Total Projects</div>
            </div>

            <div
              className="hidden sm:block absolute -left-8 bottom-32 bg-white rounded-3xl p-6 shadow-2xl border border-slate-50 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-primary font-black text-3xl tracking-tighter">100%</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Transparency</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
