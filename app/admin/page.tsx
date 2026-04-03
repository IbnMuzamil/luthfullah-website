"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, RefreshCw, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Config {
  header: {
    brandName: string
    logoAlt: string
    navLinks: Array<{ label: string; href: string }>
  }
  hero: {
    badgeText: string
    headline: string
    headlineHighlight: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    stats: Array<{ value: string; label: string }>
  }
  footer: {
    copyrightText: string
    links: Array<{ label: string; href: string }>
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
}

export default function AdminDashboard() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/config")
      if (!res.ok) throw new Error("Failed to fetch config")
      const data = await res.json()
      // Ensure theme object exists
      if (!data.theme) {
        data.theme = {
          primaryColor: "#3B82F6",
          secondaryColor: "#FF6B6B",
          accentColor: "#4F46E5",
        }
      }
      setConfig(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load site configuration",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    if (!config) return
    try {
      setSaving(true)
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (!res.ok) throw new Error("Failed to save config")
      toast({
        title: "Success",
        description: "Configuration saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addNavLink = () => {
    if (!config) return
    setConfig({
      ...config,
      header: {
        ...config.header,
        navLinks: [...config.header.navLinks, { label: "New Link", href: "/" }],
      },
    })
  }

  const removeNavLink = (idx: number) => {
    if (!config) return
    setConfig({
      ...config,
      header: {
        ...config.header,
        navLinks: config.header.navLinks.filter((_, i) => i !== idx),
      },
    })
  }

  const addFooterLink = () => {
    if (!config) return
    setConfig({
      ...config,
      footer: {
        ...config.footer,
        links: [...config.footer.links, { label: "New Link", href: "/" }],
      },
    })
  }

  const removeFooterLink = (idx: number) => {
    if (!config) return
    setConfig({
      ...config,
      footer: {
        ...config.footer,
        links: config.footer.links.filter((_, i) => i !== idx),
      },
    })
  }

  const addStat = () => {
    if (!config) return
    setConfig({
      ...config,
      hero: {
        ...config.hero,
        stats: [...config.hero.stats, { value: "0+", label: "New Stat" }],
      },
    })
  }

  const removeStat = (idx: number) => {
    if (!config) return
    setConfig({
      ...config,
      hero: {
        ...config.hero,
        stats: config.hero.stats.filter((_, i) => i !== idx),
      },
    })
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-lg">Loading configuration...</div>
      </div>
    )

  if (!config)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-lg">Failed to load configuration</div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-400">Manage your website content</p>
            </div>
          </div>
          <Button
            onClick={fetchConfig}
            disabled={loading}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="header" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border border-slate-700 rounded-lg p-1">
            <TabsTrigger value="header" className="text-white data-[state=active]:bg-blue-600">
              Header
            </TabsTrigger>
            <TabsTrigger value="hero" className="text-white data-[state=active]:bg-blue-600">
              Hero
            </TabsTrigger>
            <TabsTrigger value="footer" className="text-white data-[state=active]:bg-blue-600">
              Footer
            </TabsTrigger>
            <TabsTrigger value="theme" className="text-white data-[state=active]:bg-blue-600">
              Theme
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-white data-[state=active]:bg-blue-600">
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Header Tab */}
          <TabsContent value="header" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Header Settings</CardTitle>
                <CardDescription className="text-slate-400">Configure your website header</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="brandName" className="text-white">
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    value={config.header.brandName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        header: { ...config.header, brandName: e.target.value },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-white">Navigation Links</Label>
                    <Button
                      onClick={addNavLink}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Link
                    </Button>
                  </div>
                  {config.header.navLinks.map((link, idx) => (
                    <div key={idx} className="space-y-3 mb-4 p-4 bg-slate-700 rounded-lg relative">
                      <button
                        onClick={() => removeNavLink(idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...config.header.navLinks]
                          newLinks[idx].label = e.target.value
                          setConfig({
                            ...config,
                            header: { ...config.header, navLinks: newLinks },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="URL (e.g., /about)"
                        value={link.href}
                        onChange={(e) => {
                          const newLinks = [...config.header.navLinks]
                          newLinks[idx].href = e.target.value
                          setConfig({
                            ...config,
                            header: { ...config.header, navLinks: newLinks },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Hero Section</CardTitle>
                <CardDescription className="text-slate-400">Customize your hero section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="badgeText" className="text-white">
                    Badge Text
                  </Label>
                  <Input
                    id="badgeText"
                    value={config.hero.badgeText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, badgeText: e.target.value },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="headline" className="text-white">
                      Main Headline
                    </Label>
                    <Input
                      id="headline"
                      value={config.hero.headline}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          hero: { ...config.hero, headline: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="headlineHighlight" className="text-white">
                      Highlight Word
                    </Label>
                    <Input
                      id="headlineHighlight"
                      value={config.hero.headlineHighlight}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          hero: { ...config.hero, headlineHighlight: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subheadline" className="text-white">
                    Subheadline
                  </Label>
                  <Textarea
                    id="subheadline"
                    value={config.hero.subheadline}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, subheadline: e.target.value },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ctaPrimary" className="text-white">
                      Primary Button Text
                    </Label>
                    <Input
                      id="ctaPrimary"
                      value={config.hero.ctaPrimary}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          hero: { ...config.hero, ctaPrimary: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ctaSecondary" className="text-white">
                      Secondary Button Text
                    </Label>
                    <Input
                      id="ctaSecondary"
                      value={config.hero.ctaSecondary}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          hero: { ...config.hero, ctaSecondary: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-white">Stats</Label>
                    <Button
                      onClick={addStat}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Stat
                    </Button>
                  </div>
                  {config.hero.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-3 mb-4 p-4 bg-slate-700 rounded-lg relative">
                      <button
                        onClick={() => removeStat(idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Value (e.g., 20+)"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...config.hero.stats]
                          newStats[idx].value = e.target.value
                          setConfig({
                            ...config,
                            hero: { ...config.hero, stats: newStats },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="Label"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...config.hero.stats]
                          newStats[idx].label = e.target.value
                          setConfig({
                            ...config,
                            hero: { ...config.hero, stats: newStats },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Footer Settings</CardTitle>
                <CardDescription className="text-slate-400">Customize footer content and links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="copyrightText" className="text-white">
                    Copyright Text
                  </Label>
                  <Input
                    id="copyrightText"
                    value={config.footer.copyrightText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        footer: { ...config.footer, copyrightText: e.target.value },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-white">Footer Links</Label>
                    <Button
                      onClick={addFooterLink}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Link
                    </Button>
                  </div>
                  {config.footer.links.map((link, idx) => (
                    <div key={idx} className="space-y-3 mb-4 p-4 bg-slate-700 rounded-lg relative">
                      <button
                        onClick={() => removeFooterLink(idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...config.footer.links]
                          newLinks[idx].label = e.target.value
                          setConfig({
                            ...config,
                            footer: { ...config.footer, links: newLinks },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <Input
                        placeholder="URL (e.g., /privacy)"
                        value={link.href}
                        onChange={(e) => {
                          const newLinks = [...config.footer.links]
                          newLinks[idx].href = e.target.value
                          setConfig({
                            ...config,
                            footer: { ...config.footer, links: newLinks },
                          })
                        }}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Theme Colors</CardTitle>
                <CardDescription className="text-slate-400">Customize your site colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="primaryColor" className="text-white mb-3 block">
                    Primary Color
                  </Label>
                  <div className="flex gap-4 items-end">
                    <div className="space-y-2">
                      <input
                        id="primaryColor"
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: { ...config.theme, primaryColor: e.target.value },
                          })
                        }
                        className="w-24 h-24 rounded cursor-pointer border-2 border-slate-600"
                      />
                    </div>
                    <Input
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, primaryColor: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor" className="text-white mb-3 block">
                    Secondary Color
                  </Label>
                  <div className="flex gap-4 items-end">
                    <div className="space-y-2">
                      <input
                        id="secondaryColor"
                        type="color"
                        value={config.theme.secondaryColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: { ...config.theme, secondaryColor: e.target.value },
                          })
                        }
                        className="w-24 h-24 rounded cursor-pointer border-2 border-slate-600"
                      />
                    </div>
                    <Input
                      value={config.theme.secondaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, secondaryColor: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor" className="text-white mb-3 block">
                    Accent Color
                  </Label>
                  <div className="flex gap-4 items-end">
                    <div className="space-y-2">
                      <input
                        id="accentColor"
                        type="color"
                        value={config.theme.accentColor}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            theme: { ...config.theme, accentColor: e.target.value },
                          })
                        }
                        className="w-24 h-24 rounded cursor-pointer border-2 border-slate-600"
                      />
                    </div>
                    <Input
                      value={config.theme.accentColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, accentColor: e.target.value },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Live Preview</CardTitle>
                <CardDescription className="text-slate-400">See how your changes look</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-semibold">Primary</p>
                    <div
                      className="w-full h-32 rounded-lg border-2 border-slate-600 shadow-lg"
                      style={{ backgroundColor: config.theme.primaryColor }}
                    ></div>
                    <p className="text-white text-sm text-center font-mono">{config.theme.primaryColor}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-semibold">Secondary</p>
                    <div
                      className="w-full h-32 rounded-lg border-2 border-slate-600 shadow-lg"
                      style={{ backgroundColor: config.theme.secondaryColor }}
                    ></div>
                    <p className="text-white text-sm text-center font-mono">{config.theme.secondaryColor}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-semibold">Accent</p>
                    <div
                      className="w-full h-32 rounded-lg border-2 border-slate-600 shadow-lg"
                      style={{ backgroundColor: config.theme.accentColor }}
                    ></div>
                    <p className="text-white text-sm text-center font-mono">{config.theme.accentColor}</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <p className="text-slate-400 text-sm font-semibold mb-4">Hero Preview</p>
                  <div className="bg-slate-700 p-6 rounded-lg space-y-3">
                    <p className="text-xs text-slate-500">{config.hero.badgeText}</p>
                    <h2 className="text-2xl font-bold text-white">
                      {config.hero.headline} <span style={{ color: config.theme.primaryColor }}>
                        {config.hero.headlineHighlight}
                      </span>
                    </h2>
                    <p className="text-sm text-slate-300">{config.hero.subheadline}</p>
                    <div className="flex gap-3 pt-3">
                      <button
                        className="px-4 py-2 rounded text-white text-sm font-semibold"
                        style={{ backgroundColor: config.theme.primaryColor }}
                      >
                        {config.hero.ctaPrimary}
                      </button>
                      <button
                        className="px-4 py-2 rounded text-white text-sm font-semibold border"
                        style={{
                          borderColor: config.theme.accentColor,
                          color: config.theme.accentColor,
                        }}
                      >
                        {config.hero.ctaSecondary}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <p className="text-slate-400 text-sm font-semibold mb-4">Footer Preview</p>
                  <div
                    className="bg-slate-700 p-6 rounded-lg text-center space-y-3"
                    style={{ borderTopColor: config.theme.primaryColor, borderTopWidth: "3px" }}
                  >
                    <p className="text-white text-sm">{config.footer.copyrightText}</p>
                    <div className="flex justify-center gap-4 text-xs">
                      {config.footer.links.map((link, idx) => (
                        <a key={idx} href={link.href} className="text-slate-400 hover:text-white">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Buttons */}
        <div className="mt-10 flex gap-4 sticky bottom-6">
          <Button
            onClick={saveConfig}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold gap-2 shadow-lg"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </Button>
          <Button
            onClick={fetchConfig}
            className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-2 rounded-lg font-semibold"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
