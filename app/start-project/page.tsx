"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, School, Users, Droplets, Home, Plus, Send } from "lucide-react"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const projectTypes = [
  { value: "mosque", label: "Mosque", icon: Building2 },
  { value: "school", label: "School or Educational Facility", icon: School },
  { value: "community-center", label: "Community Center", icon: Users },
  { value: "water", label: "Water & Sanitation", icon: Droplets },
  { value: "shelter", label: "Shelter or Housing", icon: Home },
  { value: "custom", label: "Custom Project", icon: Plus },
]

export default function StartProjectPage() {
  const [selectedType, setSelectedType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    budget: "",
    timeline: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Start Your <span className="text-primary">Charity Project</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Tell us about your vision and we'll help you turn it into lasting community impact
              </p>
            </div>
          </div>
        </section>

        {/* Project Type Selection */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 text-center">What would you like to build?</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {projectTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = selectedType === type.value

                  return (
                    <Card
                      key={type.value}
                      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                        isSelected ? "border-primary border-2 bg-primary/5" : "border-border"
                      }`}
                      onClick={() => {
                        setSelectedType(type.value)
                        setFormData({ ...formData, projectType: type.value })
                      }}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div
                          className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-semibold">{type.label}</h3>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 md:p-12 bg-card">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Your Information</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Project Details</h3>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => {
                          setFormData({ ...formData, projectType: value })
                          setSelectedType(value)
                        }}
                      >
                        <SelectTrigger id="projectType">
                          <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location</Label>
                      <Input
                        id="location"
                        placeholder="Country or region"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                      <p className="text-sm text-muted-foreground">
                        Let us know if you have a specific location in mind, or we can suggest communities in need
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Estimated Budget</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-25k">Under $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                            <SelectItem value="over-250k">Over $250,000</SelectItem>
                            <SelectItem value="flexible">Flexible / Need Guidance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Desired Timeline</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                        >
                          <SelectTrigger id="timeline">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-6months">3-6 months</SelectItem>
                            <SelectItem value="6-12months">6-12 months</SelectItem>
                            <SelectItem value="12months+">12+ months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Tell Us About Your Vision</Label>
                      <Textarea
                        id="description"
                        placeholder="Share any specific requirements, goals, or details about what you'd like to achieve..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                      <p className="text-sm text-muted-foreground">
                        The more detail you provide, the better we can tailor our proposal to your vision
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-6">
                    <Button type="submit" size="lg" className="w-full bg-cta hover:bg-cta/90 text-cta-foreground group">
                      Submit Project Request
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      We'll review your request and get back to you within 24-48 hours with a detailed proposal
                    </p>
                  </div>
                </form>
              </Card>

              {/* What Happens Next */}
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl font-semibold text-center">What Happens Next?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-secondary/30 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24-48h</div>
                    <p className="text-sm text-muted-foreground">
                      We review your request and prepare a detailed proposal
                    </p>
                  </Card>
                  <Card className="p-6 bg-secondary/30 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">Consultation</div>
                    <p className="text-sm text-muted-foreground">We schedule a call to discuss your vision in detail</p>
                  </Card>
                  <Card className="p-6 bg-secondary/30 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">Proposal</div>
                    <p className="text-sm text-muted-foreground">Receive complete project plan, budget, and timeline</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
