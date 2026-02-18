"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Set initial window width and update on resize in a client-safe way
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-teal animate-gradient" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div
        className="absolute top-20 left-4 md:left-10 w-32 md:w-64 h-32 md:h-64 bg-gold/30 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />
      <div
        className="absolute bottom-20 right-4 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-teal/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s", transform: `translateY(${scrollY * -0.15}px)` }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-white">
            {/* Trust badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass-effect text-white text-xs md:text-sm font-medium transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-gold" />
              <span className="hidden sm:inline">Trusted by thousands of donors worldwide</span>
              <span className="sm:hidden">Trusted worldwide</span>
            </div>

            {/* Brand name */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider mb-2 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent animate-shimmer">
                LUTHFULLAH
              </h2>
              <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-gold to-transparent rounded-full" />
            </div>

            {/* Main headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-balance leading-tight transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Transform Charity Into{" "}
              <span className="bg-gradient-to-r from-gold via-yellow-200 to-gold bg-clip-text text-transparent animate-gradient">
                Eternal Legacy
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-base md:text-xl lg:text-2xl text-white/90 text-balance transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We orchestrate world-class charity construction projects with unwavering transparency, precision, and
              trust. Build mosques, schools, and community centers that serve generations.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-3 md:gap-4 pt-4 transition-all duration-700 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-gold-foreground text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group shadow-2xl shadow-gold/50 border-2 border-gold/20 w-full sm:w-auto"
                asChild
              >
                <Link href="/start-project">
                  Start Your Legacy Project
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 border-white/30 text-white hover:bg-white/10 glass-effect bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="/how-it-works">Discover Our Process</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className={`grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 transition-all duration-700 delay-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-center glass-effect rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold">250+</div>
                <div className="text-xs md:text-sm text-white/80 mt-1">Projects Completed</div>
              </div>
              <div className="text-center glass-effect rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold">45</div>
                <div className="text-xs md:text-sm text-white/80 mt-1">Countries Served</div>
              </div>
              <div className="text-center glass-effect rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold">100%</div>
                <div className="text-xs md:text-sm text-white/80 mt-1">Transparent</div>
              </div>
            </div>
          </div>

          <div
            className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"
            }`}
              style={{
                transform:
                  windowWidth > 768 ? `translateY(${scrollY * -0.1}px) rotateY(${scrollY * 0.02}deg)` : undefined,
              }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 w-20 md:w-32 h-20 md:h-32 bg-gold/30 rounded-full blur-2xl animate-pulse" />
            <div
              className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 w-24 md:w-40 h-24 md:h-40 bg-teal/30 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Main image container with 3D transform */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-2 md:border-4 border-white/20 glass-effect">
              <Image
                src="/beautiful-mosque-architecture.jpg"
                alt="Beautiful charity construction - Luthfullah project showcase"
                width={700}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 md:gap-3">
                  <Heart className="w-6 md:w-8 h-6 md:h-8 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-white font-bold text-base md:text-lg">Sadaqah Jariyah</div>
                    <div className="text-white/80 text-xs md:text-sm">Continuous charity for generations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="hidden sm:block absolute -right-2 md:-right-4 top-16 md:top-20 glass-effect rounded-lg md:rounded-xl p-3 md:p-4 shadow-xl animate-float">
              <div className="text-gold font-bold text-lg md:text-2xl">$2.5M+</div>
              <div className="text-white text-xs">Total Funds</div>
            </div>

            <div
              className="hidden sm:block absolute -left-2 md:-left-4 bottom-24 md:bottom-32 glass-effect rounded-lg md:rounded-xl p-3 md:p-4 shadow-xl animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-gold font-bold text-lg md:text-2xl">4.9★</div>
              <div className="text-white text-xs">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade with luxury gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
