"use client"
import { Card } from "@/components/ui/card"
import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Have questions about starting a project? Want to learn more about our process? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We're here to answer your questions and help you start building lasting impact.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 bg-card space-y-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <a href="mailto:info@charityinfrastructure.org" className="text-primary hover:underline">
                          info@charityinfrastructure.org
                        </a>
                      </div>
                    </Card>

                    <Card className="p-6 bg-card space-y-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <a href="tel:+1-555-CHARITY" className="text-primary hover:underline">
                          +1 (555) CHARITY
                        </a>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </Card>

                    <Card className="p-6 bg-card space-y-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Main Office</h3>
                        <p className="text-muted-foreground text-sm">123 Charity Way, Suite 400</p>
                        <p className="text-muted-foreground text-sm">New York, NY 10001</p>
                      </div>
                    </Card>

                    <Card className="p-6 bg-card space-y-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Response Time</h3>
                        <p className="text-muted-foreground text-sm">We typically respond within 24-48 hours</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <Card className="p-8 md:p-10 bg-card">
                    <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                      <div className="grid md:grid-cols-2 gap-6">
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

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="Project inquiry, general question, etc."
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-cta hover:bg-cta/90 text-cta-foreground group"
                      >
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common Questions</h2>

              <div className="space-y-6">
                <Card className="p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-2">How long does a typical project take?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Construction timelines vary by project type and location. Small projects like water wells can be
                    completed in 2-3 months, while larger structures like schools or community centers typically take
                    6-12 months. We provide detailed timelines in our project proposals.
                  </p>
                </Card>

                <Card className="p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-2">What's the minimum budget for starting a project?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Project costs vary by type and location. Water wells can start around $15,000, while mosques and
                    schools typically range from $40,000-$150,000. We can help you find a project that fits your budget
                    and maximizes impact.
                  </p>
                </Card>

                <Card className="p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-2">Can I visit the project site during construction?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We welcome site visits and can help coordinate travel logistics if you'd like to see your project in
                    person. We also provide regular photo/video updates if in-person visits aren't possible.
                  </p>
                </Card>

                <Card className="p-6 bg-card">
                  <h3 className="font-semibold text-lg mb-2">How do you ensure transparency and accountability?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every project includes itemized budgets, regular photo updates, detailed financial reporting with
                    receipts, GPS coordinates for verification, and completion documentation. We maintain relationships
                    with communities for long-term impact monitoring.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
