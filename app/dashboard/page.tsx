"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Image as ImageIcon, 
  ClipboardList, 
  Mail, 
  Building2,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  Download,
  Upload,
  LogOut,
  Globe,
  Edit,
  ExternalLink,
  Link as LinkIcon,
  Palette,
  CheckCircle2,
  Search,
  ChevronRight,
  MoreVertical,
  Layers,
  Component,
  X,
  PlusCircle,
  ArrowRight,
  Monitor,
  Phone,
  Tablet,
  Check,
  Clock,
  MessageCircle,
  CreditCard
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import Image from "next/image"

// --- Types ---

interface Config {
  header: {
    brandName: string
    tagline?: string
    logoUrl?: string
    logoAlt: string
    navLinks: Array<{ label: string; href: string }>
  }
  faviconUrl?: string
  contactInfo?: {
    email: string
    phone: string
    address: string
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
    description?: string
    links: Array<{ label: string; href: string }>
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
}

// --- Dashboard Component ---

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [config, setConfig] = useState<Config | null>(null)
  const [pages, setPages] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [media, setMedia] = useState<any[]>([])
  const [forms, setForms] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState<any | null>(null)
  const [portfolioSaving, setPortfolioSaving] = useState(false)
  
  // Page Editing
  const [selectedPageKey, setSelectedPageKey] = useState<string | null>(null)
  
  // Media Picker
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [onMediaSelected, setOnMediaSelected] = useState<((url: string) => void) | null>(null)
  
  const { toast } = useToast()

  const loadAllData = useCallback(async () => {
    setLoading(true)
    try {
      const [configRes, pagesRes, projectsRes, portfolioRes, mediaRes, formsRes, submissionsRes, ordersRes] = await Promise.all([
        fetch("/api/config"),
        fetch("/api/pages"),
        fetch("/api/projects"),
        fetch("/api/portfolio-projects"),
        fetch("/api/media"),
        fetch("/api/forms"),
        fetch("/api/submissions"),
        fetch("/api/orders")
      ])

      const configData = await configRes.json()
      if (!configData.theme) configData.theme = { primaryColor: "#3B82F6", secondaryColor: "#FF6B6B", accentColor: "#4F46E5" }
      
      setConfig(configData)
      setPages(await pagesRes.json())
      const projs = await projectsRes.json()
      setProjects(projs.data || projs)
      setPortfolioItems(await portfolioRes.json())
      setMedia(await mediaRes.json())
      setForms(await formsRes.json())
      setSubmissions(await submissionsRes.json())
      setOrders(await ordersRes.json())
    } catch (error) {
      toast({ title: "Error", description: "Failed to load dashboard data", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  // --- Handlers ---

  const saveConfig = async () => {
    if (!config) return
    setSaving(true)
    try {
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      toast({ title: "Success", description: "Global configuration updated" })
    } catch {
      toast({ title: "Error", description: "Failed to save configuration", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const savePages = async () => {
    if (!pages) return
    setSaving(true)
    try {
      await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pages),
      })
      toast({ title: "Success", description: "All pages saved successfully" })
    } catch {
      toast({ title: "Error", description: "Failed to save page content", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    try {
      await fetch('/api/media', { method: 'POST', body: formData })
      loadAllData()
      toast({ title: "Upload Success", description: "Media item added to library" })
    } catch (error) {
      toast({ title: "Upload failed", variant: "destructive" })
    }
  }

  const deleteMedia = async (id: string) => {
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
      loadAllData()
      toast({ title: "Deleted", description: "Media removed from library" })
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" })
    }
  }

  const deletePortfolioItem = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio-projects?id=${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Failed to delete portfolio project')
      loadAllData()
      toast({ title: 'Deleted', description: 'Portfolio project removed from list.' })
    } catch (error) {
      toast({ title: 'Delete failed', description: 'Could not remove the portfolio project.', variant: 'destructive' })
    }
  }

  const openMediaPicker = (onSelected: (url: string) => void) => {
    setOnMediaSelected(() => onSelected)
    setMediaPickerOpen(true)
  }

  // --- Recursive Editor Renderer ---
  const renderField = (label: string, value: any, path: string[], pageKey: string) => {
    // Detect if field is likely an image/URL
    const isImage = label.toLowerCase().includes('url') || 
                    label.toLowerCase().includes('image') || 
                    label.toLowerCase().includes('logo') || 
                    label.toLowerCase().includes('favicon') ||
                    (typeof value === 'string' && (value.startsWith('/uploads/') || value.startsWith('http') || value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.svg') || value.endsWith('.ico')));
    
    if (Array.isArray(value)) {
      return (
        <div key={label} className="space-y-4 p-6 border border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm group/container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-blue-500" />
               </div>
               <Label className="text-sm font-black uppercase tracking-widest text-slate-400">{label}</Label>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-[10px] font-black rounded-xl border-slate-800 hover:bg-blue-600 hover:text-white transition-all" onClick={() => {
              const newPages = { ...pages };
              const targetArr = path.reduce((acc, k) => acc[k], newPages[pageKey]);
              const template = targetArr.length > 0 ? JSON.parse(JSON.stringify(targetArr[targetArr.length - 1])) : {};
              targetArr.push(template);
              setPages(newPages);
            }}>
              <Plus className="w-3 h-3 mr-1" /> ADD {label.toUpperCase()}
            </Button>
          </div>
          <div className="grid gap-6">
            {value.map((item, idx) => (
              <div key={idx} className="relative p-6 bg-slate-950/40 rounded-2xl border border-slate-800/50 group/item hover:border-blue-500/30 transition-all">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute -right-2 -top-2 h-8 w-8 p-0 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white opacity-0 group-hover/item:opacity-100 transition-all rounded-xl border border-red-500/20 shadow-xl z-10"
                  onClick={() => {
                    const newPages = { ...pages };
                    const targetArr = path.reduce((acc, k) => acc[k], newPages[pageKey]);
                    targetArr.splice(idx, 1);
                    setPages(newPages);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid gap-4">
                  {Object.keys(item).map((k) => renderField(k, item[k], [...path, idx.toString(), k], pageKey))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={label} className="space-y-4 p-6 border border-slate-800/50 rounded-3xl bg-slate-950/20">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
             <Label className="text-sm font-black uppercase tracking-widest text-slate-500">{label}</Label>
          </div>
          <div className="grid gap-4">
            {Object.keys(value).map((k) => renderField(k, value[k], [...path, k], pageKey))}
          </div>
        </div>
      );
    }

    return (
      <div key={label} className="space-y-2">
        <Label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">{label.replace(/([A-Z])/g, ' $1')}</Label>
        {isImage ? (
          <div className="group relative flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500">
              <Image src={value || "/placeholder.svg"} alt="Preview" width={80} height={80} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <ImageIcon className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="relative">
                <Input 
                  value={value} 
                  onChange={(e) => {
                    const newPages = { ...pages };
                    let target = newPages[pageKey];
                    for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
                    target[path[path.length - 1]] = e.target.value;
                    setPages(newPages);
                  }}
                  className="h-9 text-xs bg-slate-900/50 border-slate-800 rounded-xl focus:ring-blue-500/20 pr-10"
                  placeholder="URL or Path"
                />
                <LinkIcon className="absolute right-3 top-2.5 w-4 h-4 text-slate-600" />
              </div>
              <Button size="sm" variant="secondary" className="h-9 text-[10px] font-black w-full rounded-xl bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all" onClick={() => openMediaPicker((url) => {
                 const newPages = { ...pages };
                 let target = newPages[pageKey];
                 for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
                 target[path[path.length - 1]] = url;
                 setPages(newPages);
              })}>
                <ImageIcon className="w-3 h-3 mr-2" /> SELECT FROM MEDIA LIBRARY
              </Button>
            </div>
          </div>
        ) : (
          typeof value === 'string' && value.length > 60 ? (
            <Textarea 
              value={value} 
              onChange={(e) => {
                const newPages = { ...pages };
                let target = newPages[pageKey];
                for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
                target[path[path.length - 1]] = e.target.value;
                setPages(newPages);
              }}
              className="bg-slate-900 border-slate-800 text-sm min-h-[120px] rounded-2xl focus:ring-blue-500/20 leading-relaxed p-4"
            />
          ) : (
            <Input 
              value={value} 
              onChange={(e) => {
                const newPages = { ...pages };
                let target = newPages[pageKey];
                for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
                target[path[path.length - 1]] = e.target.value;
                setPages(newPages);
              }}
              className="bg-slate-900 border-slate-800 h-12 text-sm rounded-xl focus:ring-blue-500/20 px-4"
            />
          )
        )}
      </div>
    );
  };

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Order Management", icon: ClipboardList },
    { id: "site-config", label: "Global Settings", icon: Settings },
    { id: "pages", label: "Visual CMS", icon: Layers },
    { id: "portfolio", label: "Portfolio Manager", icon: Building2 },
    { id: "media", label: "Media Engine", icon: ImageIcon },
    { id: "submissions", label: "Leads & Inbox", icon: Mail },
  ]

  if (loading && !config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white gap-4">
        <div className="relative w-16 h-16">
          <RefreshCw className="w-16 h-16 animate-spin text-blue-500 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-slate-500 animate-pulse uppercase tracking-widest text-xs font-bold">Initializing Luthfullah Engine...</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-950 font-sans selection:bg-blue-500/30">
        
        {/* --- Sidebar --- */}
        <Sidebar className="border-r border-slate-900 bg-slate-950/50 backdrop-blur-xl text-slate-400">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-black text-xl tracking-tight leading-none">Luthfullah</h2>
                <div className="flex items-center gap-1.5 mt-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">v3.0.4 Online</p>
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-600 text-[10px] uppercase font-black tracking-[0.2em] px-4 mb-4 mt-2">Core Systems</SidebarGroupLabel>
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id 
                        ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                        : "hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-blue-500" : "text-slate-500"}`} />
                      <span className="font-semibold text-sm">{item.label}</span>
                      {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-500" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 mt-auto">
             <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">System Status</p>
                <div className="flex items-center justify-between text-xs mb-1">
                   <span className="text-slate-300">Disk Usage</span>
                   <span className="text-blue-400 font-bold">12%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-full w-[12%]" />
                </div>
             </div>
            <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-white hover:bg-slate-900 rounded-xl px-4 py-6" asChild>
              <Link href="/">
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-semibold">Exit Panel</span>
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* --- Main Viewport --- */}
        <SidebarInset className="flex-1 overflow-auto bg-slate-950 ring-1 ring-slate-900">
          <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl px-10">
            <SidebarTrigger className="text-slate-500 hover:text-white transition-colors" />
            <div className="flex-1">
               <div className="flex items-center gap-2">
                 <h1 className="text-xl font-black text-white capitalize tracking-tight">{activeTab.replace("-", " ")}</h1>
                 <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 px-2 py-0 text-[10px] font-bold uppercase tracking-wider">Master Control</Badge>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-full border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Save Ready</span>
               </div>
               <Button variant="outline" onClick={loadAllData} className="rounded-xl border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 px-4">
                 <RefreshCw className="w-4 h-4 mr-2" /> Sync
               </Button>
               {(activeTab === "site-config" || activeTab === "pages") && (
                 <Button onClick={activeTab === "site-config" ? saveConfig : savePages} disabled={saving} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold shadow-lg shadow-blue-600/20">
                   {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                   Commit Changes
                 </Button>
               )}
            </div>
          </header>

          <main className="p-10">
            <div className="max-w-7xl mx-auto">
              
              {/* --- VISUAL CMS (PAGES) --- */}
              {activeTab === "pages" && pages && (
                <div className="space-y-10">
                   <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Visual CMS</h2>
                      <p className="text-slate-500 mt-2 font-medium">Select a page to edit its entire structure and content live.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {Object.keys(pages).map((key) => (
                      <Card 
                        key={key} 
                        className={`min-w-[280px] cursor-pointer transition-all duration-300 overflow-hidden border-2 ${selectedPageKey === key ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                        onClick={() => setSelectedPageKey(key)}
                      >
                         <div className="p-6">
                            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center ${selectedPageKey === key ? 'bg-blue-500 text-white' : 'bg-slate-950 text-slate-500'}`}>
                               <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white capitalize">{key.replace("-", " ")}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Entrypoint: /{key === 'index' ? '' : key}</p>
                         </div>
                         <div className={`h-1 w-full ${selectedPageKey === key ? 'bg-blue-500' : 'bg-slate-800'}`} />
                      </Card>
                    ))}
                  </div>

                  {selectedPageKey ? (
                    <Card className="bg-slate-900 border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden">
                       <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800 flex flex-row items-center justify-between">
                          <div>
                             <CardTitle className="text-2xl font-black text-white capitalize tracking-tight">Editor: {selectedPageKey.replace("-", " ")}</CardTitle>
                             <CardDescription className="text-slate-500 mt-1 font-medium">Updating this page will affect live users immediately after committing changes.</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-xl border-slate-800 bg-slate-950 text-slate-400 hover:text-white" onClick={() => window.open(selectedPageKey === 'index' ? '/' : `/${selectedPageKey}`, '_blank')}>
                             <Eye className="w-4 h-4 mr-2" /> Live Preview
                          </Button>
                       </CardHeader>
                       <CardContent className="p-10 space-y-10">
                          {Object.keys(pages[selectedPageKey]).map((k) => renderField(k, pages[selectedPageKey][k], [k], selectedPageKey))}
                       </CardContent>
                       <CardFooter className="p-10 bg-slate-950/30 border-t border-slate-800 flex justify-end">
                          <Button onClick={savePages} disabled={saving} className="rounded-2xl bg-blue-600 hover:bg-blue-700 h-14 px-10 font-black text-lg shadow-xl shadow-blue-600/20">
                             {saving ? <RefreshCw className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3" />} Commit Page Changes
                          </Button>
                       </CardFooter>
                    </Card>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-800 text-center px-10">
                       <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl ring-1 ring-slate-800">
                          <Layers className="w-10 h-10 text-slate-700" />
                       </div>
                       <h3 className="text-2xl font-black text-white tracking-tight">No Page Selected</h3>
                       <p className="text-slate-500 mt-2 max-w-sm font-medium">Please select a page from the navigator above to start editing its content and components.</p>
                    </div>
                  )}
                </div>
              )}

              {/* --- OVERVIEW --- */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Active Pages", value: Object.keys(pages || {}).length, icon: FileText, color: "from-blue-600 to-cyan-500", desc: "Live content entrypoints" },
                      { label: "Total Orders", value: orders.length, icon: ClipboardList, color: "from-green-600 to-emerald-500", desc: "Completed transactions" },
                      { label: "Portfolio Pieces", value: portfolioItems.length, icon: Building2, color: "from-emerald-600 to-teal-500", desc: "Completed project case studies" },
                      { label: "Media Library", value: media.length, icon: ImageIcon, color: "from-amber-600 to-orange-500", desc: "Assets in cloud storage" },
                      { label: "Total Leads", value: submissions.length, icon: Mail, color: "from-purple-600 to-pink-500", desc: "Inbound community requests" },
                    ].map((stat, i) => (
                      <Card key={i} className="bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-700 transition-all duration-300">
                        <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`} />
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                              <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">{stat.value}</h3>
                              <p className="text-[10px] text-slate-600 mt-2 font-medium">{stat.desc}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                               <stat.icon className="w-6 h-6 text-slate-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <Card className="lg:col-span-2 bg-slate-900 border-slate-800 overflow-hidden shadow-2xl">
                        <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                           <div className="flex items-center justify-between">
                              <div>
                                 <CardTitle className="text-white font-black text-2xl tracking-tight">Recent Activity</CardTitle>
                                 <CardDescription className="text-slate-500 mt-1">Real-time stream of incoming community leads</CardDescription>
                              </div>
                              <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10 font-bold" onClick={() => setActiveTab("submissions")}>
                                 View All Activity <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                           </div>
                        </CardHeader>
                        <CardContent className="p-0">
                           <div className="divide-y divide-slate-800">
                              {submissions.length === 0 ? (
                                <div className="p-20 text-center text-slate-600 italic">No activity detected yet.</div>
                              ) : (
                                submissions.slice(0, 6).map((s, i) => (
                                  <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-800/30 transition-colors group">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-blue-500 font-black">
                                           {s.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{s.name || s.email || "Anonymous Lead"}</p>
                                          <div className="flex items-center gap-2 mt-1">
                                             <Badge className="text-[9px] py-0 bg-slate-800 text-slate-400 border-none uppercase tracking-widest">{s.formId || "Contact"}</Badge>
                                             <span className="text-[10px] text-slate-600 font-bold">• {new Date(s.submittedAt).toLocaleDateString()}</span>
                                          </div>
                                        </div>
                                     </div>
                                     <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="w-5 h-5 text-slate-600" />
                                     </Button>
                                  </div>
                                ))
                              )}
                           </div>
                        </CardContent>
                     </Card>

                     <div className="space-y-8">
                        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none text-white overflow-hidden relative">
                           <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                              <Globe className="w-32 h-32" />
                           </div>
                           <CardHeader className="p-8 pb-0">
                              <CardTitle className="text-3xl font-black tracking-tight">System Status</CardTitle>
                              <CardDescription className="text-blue-100 font-medium opacity-80 mt-1">Engine v3.0 stable</CardDescription>
                           </CardHeader>
                           <CardContent className="p-8">
                              <p className="text-blue-100 leading-relaxed font-medium">All local databases are synced. Ready for global content updates. 100% independent of Strapi CMS.</p>
                              <Button variant="secondary" className="mt-6 w-full font-black rounded-xl py-6" onClick={() => window.open('/', '_blank')}>
                                 Live Preview Site <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                           </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                           <CardHeader className="p-6">
                              <CardTitle className="text-white text-lg font-bold">Quick Actions</CardTitle>
                           </CardHeader>
                           <CardContent className="p-6 pt-0 space-y-3">
                              <Button variant="outline" className="w-full justify-start rounded-xl border-slate-800 hover:bg-slate-800 py-6" onClick={() => setActiveTab("media")}>
                                 <Upload className="w-4 h-4 mr-3 text-amber-500" /> Upload New Media
                              </Button>
                              <Button variant="outline" className="w-full justify-start rounded-xl border-slate-800 hover:bg-slate-800 py-6" onClick={() => setActiveTab("pages")}>
                                 <PlusCircle className="w-4 h-4 mr-3 text-emerald-500" /> Add New Section
                              </Button>
                              <Button variant="outline" className="w-full justify-start rounded-xl border-slate-800 hover:bg-slate-800 py-6" onClick={() => setActiveTab("site-config")}>
                                 <Palette className="w-4 h-4 mr-3 text-blue-500" /> Update Branding
                              </Button>
                           </CardContent>
                        </Card>
                     </div>
                  </div>
                </div>
              )}

              {/* --- SITE CONFIG --- */}
              {activeTab === "site-config" && config && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-1 space-y-4">
                     <div className="sticky top-28 space-y-6">
                        <div>
                           <h2 className="text-3xl font-black text-white tracking-tight">Identity</h2>
                           <p className="text-slate-500 text-sm mt-2">Manage your core brand assets and global site settings.</p>
                        </div>
                        <div className="space-y-2">
                           {["Branding", "Contact", "Payment Settings", "Hero Defaults", "Visual Theme"].map(item => (
                             <div key={item} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors group">
                                <span className="text-sm font-bold text-slate-400 group-hover:text-white">{item}</span>
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-3 space-y-10">
                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Brand Identity</CardTitle>
                        <CardDescription>Core naming and visual identifiers</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Public Brand Name</Label>
                            <Input 
                              value={config.header.brandName} 
                              onChange={(e) => setConfig({ ...config, header: { ...config.header, brandName: e.target.value } })}
                              className="bg-slate-950 border-slate-800 h-14 text-white font-bold rounded-2xl"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Marketing Tagline</Label>
                            <Input 
                              value={config.header.tagline} 
                              onChange={(e) => setConfig({ ...config, header: { ...config.header, tagline: e.target.value } })}
                              className="bg-slate-950 border-slate-800 h-14 text-white rounded-2xl"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Official Logo</Label>
                            <div className="relative group">
                               <div className="aspect-video rounded-3xl bg-slate-950 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-8 transition-all group-hover:border-blue-500/50">
                                  {config.header.logoUrl ? (
                                    <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-2xl shadow-2xl">
                                       <Image src={config.header.logoUrl} alt="Logo" width={200} height={100} className="max-h-full object-contain" />
                                    </div>
                                  ) : (
                                    <ImageIcon className="w-12 h-12 text-slate-800 mb-4" />
                                  )}
                                  <Button size="sm" variant="secondary" className="mt-6 rounded-xl font-bold px-6" onClick={() => openMediaPicker((url) => {
                                     setConfig({ ...config, header: { ...config.header, logoUrl: url } })
                                  })}>
                                     Replace Logo
                                  </Button>
                               </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Site Favicon</Label>
                            <div className="relative group">
                               <div className="aspect-video rounded-3xl bg-slate-950 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-8 transition-all group-hover:border-blue-500/50">
                                  {config.faviconUrl ? (
                                    <div className="w-20 h-20 bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center">
                                       <Image src={config.faviconUrl} alt="Favicon" width={64} height={64} className="w-full h-full object-contain" />
                                    </div>
                                  ) : (
                                    <Component className="w-12 h-12 text-slate-800 mb-4" />
                                  )}
                                  <Button size="sm" variant="secondary" className="mt-6 rounded-xl font-bold px-6" onClick={() => openMediaPicker((url) => {
                                     setConfig({ ...config, faviconUrl: url })
                                  })}>
                                     Replace Favicon
                                  </Button>
                               </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Navigation & Menu</CardTitle>
                        <CardDescription>Header links and navigation structure</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10">
                         {renderField("navLinks", config.header.navLinks, ["header", "navLinks"], "config")}
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Global Footer</CardTitle>
                        <CardDescription>Site footer content and links</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10 space-y-8">
                         <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Copyright Text</Label>
                            <Input 
                              value={config.footer.copyrightText} 
                              onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyrightText: e.target.value } })}
                              className="bg-slate-950 border-slate-800 h-14 text-white rounded-2xl"
                            />
                         </div>
                         <div className="space-y-3">
                            <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Footer Description</Label>
                            <Textarea 
                              value={config.footer.description} 
                              onChange={(e) => setConfig({ ...config, footer: { ...config.footer, description: e.target.value } })}
                              className="bg-slate-950 border-slate-800 text-white rounded-2xl min-h-[100px]"
                            />
                         </div>
                         {renderField("footerLinks", config.footer.links, ["footer", "links"], "config")}
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Contact Information</CardTitle>
                        <CardDescription>Global contact details and social reach</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                               <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Email Address</Label>
                               <Input 
                                 value={config.contactInfo?.email} 
                                 onChange={(e) => setConfig({ ...config, contactInfo: { ...config.contactInfo, email: e.target.value } as any })}
                                 className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl"
                               />
                            </div>
                            <div className="space-y-2">
                               <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Phone Number</Label>
                               <Input 
                                 value={config.contactInfo?.phone} 
                                 onChange={(e) => setConfig({ ...config, contactInfo: { ...config.contactInfo, phone: e.target.value } as any })}
                                 className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl"
                               />
                            </div>
                            <div className="space-y-2">
                               <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Headquarters</Label>
                               <Input 
                                 value={config.contactInfo?.address} 
                                 onChange={(e) => setConfig({ ...config, contactInfo: { ...config.contactInfo, address: e.target.value } as any })}
                                 className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl"
                               />
                            </div>
                         </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Payment Configuration</CardTitle>
                        <CardDescription>Stripe and Paystack API keys and webhook secrets</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10 space-y-8">
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-500/20 rounded-xl flex items-center justify-center">
                              <Settings className="w-4 h-4 text-amber-500" />
                            </div>
                            <h4 className="text-lg font-black text-amber-400">Environment Variables Required</h4>
                          </div>
                          <p className="text-sm text-amber-200 font-medium leading-relaxed">
                            These settings are stored as environment variables. Update your <code className="bg-amber-500/20 px-2 py-1 rounded text-xs font-mono">.env.local</code> file with the following keys:
                          </p>
                          <div className="mt-4 space-y-2 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <div className="text-slate-400"># Stripe Configuration</div>
                            <div className="text-green-400">STRIPE_SECRET_KEY=sk_test_...</div>
                            <div className="text-green-400">STRIPE_WEBHOOK_SECRET=whsec_...</div>
                            <div className="text-slate-400 mt-3"># Paystack Configuration</div>
                            <div className="text-green-400">PAYSTACK_SECRET_KEY=sk_test_...</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-blue-400" />
                              </div>
                              <Label className="text-sm font-black text-white">Stripe Settings</Label>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Secret Key</Label>
                                <Input
                                  type="password"
                                  placeholder="sk_test_..."
                                  className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl font-mono text-sm"
                                  value={process.env.STRIPE_SECRET_KEY || ''}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Webhook Secret</Label>
                                <Input
                                  type="password"
                                  placeholder="whsec_..."
                                  className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl font-mono text-sm"
                                  value={process.env.STRIPE_WEBHOOK_SECRET || ''}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                                <Globe className="w-4 h-4 text-green-400" />
                              </div>
                              <Label className="text-sm font-black text-white">Paystack Settings</Label>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Secret Key</Label>
                                <Input
                                  type="password"
                                  placeholder="sk_test_..."
                                  className="bg-slate-950 border-slate-800 h-12 text-white rounded-xl font-mono text-sm"
                                  value={process.env.PAYSTACK_SECRET_KEY || ''}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                          <h4 className="text-lg font-black text-white mb-4">Webhook Endpoints</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                              <div>
                                <p className="text-sm font-bold text-white">Stripe Webhook</p>
                                <p className="text-xs text-slate-500 font-mono">/api/payments/stripe/webhook</p>
                              </div>
                              <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                              <div>
                                <p className="text-sm font-bold text-white">Paystack Webhook</p>
                                <p className="text-xs text-slate-500 font-mono">/api/payments/paystack/webhook</p>
                              </div>
                              <Badge className="bg-green-600/10 text-green-400 border-green-500/20">Active</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                        <CardTitle className="text-white text-2xl font-black tracking-tight">Visual Theme</CardTitle>
                        <CardDescription>Primary colors and accent styling</CardDescription>
                      </CardHeader>
                      <CardContent className="p-10">
                        <div className="grid grid-cols-3 gap-10">
                           {['primaryColor', 'secondaryColor', 'accentColor'].map(color => (
                              <div key={color} className="space-y-4 text-center">
                                 <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{color.replace(/([A-Z])/g, ' $1')}</Label>
                                 <div className="flex flex-col items-center gap-4">
                                    <div 
                                      className="w-20 h-20 rounded-[2rem] shadow-2xl ring-4 ring-slate-950 border-2 border-slate-800"
                                      style={{ backgroundColor: (config.theme as any)[color] }}
                                    />
                                    <Input 
                                      value={(config.theme as any)[color]} 
                                      onChange={(e) => setConfig({ ...config, theme: { ...config.theme, [color]: e.target.value } })}
                                      className="bg-slate-950 border-slate-800 text-center font-mono font-bold text-xs rounded-xl h-10"
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* --- PAGES EDITOR --- */}
              {activeTab === "pages" && pages && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-1">
                     <div className="sticky top-28 space-y-6">
                        <div>
                           <h2 className="text-3xl font-black text-white tracking-tight">Content</h2>
                           <p className="text-slate-500 text-sm mt-2">Edit every section, column, and component across your site.</p>
                        </div>
                        <div className="space-y-2">
                          {Object.keys(pages).map((key) => (
                            <Button
                              key={key}
                              variant="ghost"
                              onClick={() => setSelectedPageKey(key)}
                              className={`w-full justify-start h-16 rounded-2xl px-6 transition-all duration-300 ${selectedPageKey === key ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"}`}
                            >
                              <FileText className={`w-5 h-5 mr-4 ${selectedPageKey === key ? "text-white" : "text-slate-600"}`} />
                              <span className="font-bold text-sm capitalize tracking-tight">{key.replace("-", " ")}</span>
                              {selectedPageKey === key && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </Button>
                          ))}
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-3">
                    {selectedPageKey ? (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                           <div>
                              <h3 className="text-4xl font-black text-white tracking-tighter capitalize">{selectedPageKey.replace("-", " ")}</h3>
                              <div className="flex items-center gap-2 mt-2">
                                 <Badge variant="outline" className="border-slate-800 text-slate-500 uppercase text-[9px] font-black">Live Production</Badge>
                                 <Badge variant="outline" className="border-slate-800 text-slate-500 uppercase text-[9px] font-black">JSON Database</Badge>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <Button variant="outline" className="rounded-xl border-slate-800 bg-slate-950 text-slate-400 font-bold" onClick={() => window.open(`/${selectedPageKey === 'index' ? '' : selectedPageKey}`, '_blank')}>
                                 <Eye className="w-4 h-4 mr-2" /> Live Preview
                              </Button>
                           </div>
                        </div>

                        <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden border-t-4 border-t-blue-600">
                          <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                                   <Component className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                   <CardTitle className="text-white text-2xl font-black tracking-tight">Component Structure</CardTitle>
                                   <CardDescription>Direct manipulation of page content blocks</CardDescription>
                                </div>
                             </div>
                          </CardHeader>
                          <CardContent className="p-8">
                             <div className="grid gap-8">
                                {Object.keys(pages[selectedPageKey]).map((sectionKey) => (
                                  <div key={sectionKey} className="group">
                                     {renderField(sectionKey, pages[selectedPageKey][sectionKey], [sectionKey], selectedPageKey)}
                                  </div>
                                ))}
                             </div>
                          </CardContent>
                          <CardFooter className="p-8 bg-slate-950/50 border-t border-slate-800">
                             <Button onClick={savePages} disabled={saving} className="ml-auto rounded-xl bg-blue-600 hover:bg-blue-700 font-black px-10 h-14 shadow-xl shadow-blue-600/20">
                                {saving ? <RefreshCw className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3" />}
                                Sync Changes to Database
                             </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    ) : (
                      <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-[3rem] text-slate-600 bg-slate-950/50 backdrop-blur-xl">
                        <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-800 animate-pulse">
                           <Edit className="w-10 h-10 opacity-20" />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Visual Engine Standby</h3>
                        <p className="text-slate-500 max-w-xs text-center font-medium leading-relaxed">Select a terminal on the left to initialize the visual content management suite.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- MEDIA LIBRARY --- */}
              {activeTab === "media" && (
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Media Assets</h2>
                      <p className="text-slate-500 mt-2 font-medium">Visual library engine for site-wide branding and content.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="relative">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                         <Input placeholder="Search assets..." className="pl-12 bg-slate-900 border-slate-800 h-14 rounded-2xl w-64 text-sm font-medium" />
                      </div>
                      <Label htmlFor="media-upload-main" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 rounded-2xl flex items-center gap-3 text-sm font-black transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95">
                        <Upload className="w-5 h-5" /> Push Asset
                      </Label>
                      <input id="media-upload-main" type="file" className="hidden" onChange={handleMediaUpload} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {media.length === 0 ? (
                      <div className="col-span-full h-80 flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-[3rem] text-slate-700 bg-slate-950/50">
                        <ImageIcon className="w-20 h-20 mb-6 opacity-10" />
                        <p className="font-bold uppercase tracking-widest text-xs">Media Engine Empty</p>
                      </div>
                    ) : (
                      media.map((file, i) => (
                        <Card key={i} className="bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-600 transition-all duration-500 rounded-[2rem] shadow-xl hover:shadow-2xl">
                          <div className="aspect-square relative bg-slate-950 flex items-center justify-center overflow-hidden">
                            {file.type?.startsWith('image/') ? (
                              <Image src={file.url} alt={file.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                              <FileText className="w-16 h-16 text-slate-800" />
                            )}
                            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-sm">
                              <Button size="sm" variant="ghost" className="w-full text-white hover:bg-white/10 rounded-xl font-bold border border-white/10" onClick={() => window.open(file.url)}>
                                <Eye className="w-4 h-4 mr-2" /> Inspect
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="w-full text-red-400 hover:bg-red-400/10 hover:text-red-400 rounded-xl font-bold border border-red-400/10">
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-slate-950 border border-slate-800 text-white rounded-[2rem] p-10">
                                  <AlertDialogTitle className="text-2xl font-black">Confirm Deletion</AlertDialogTitle>
                                  <AlertDialogDescription className="text-slate-500 mt-2 font-medium">
                                    This asset will be permanently purged from the library. Existing links on your website will be broken immediately.
                                  </AlertDialogDescription>
                                  <div className="flex justify-end gap-4 mt-10">
                                    <AlertDialogCancel className="bg-slate-900 border-slate-800 text-white hover:bg-slate-800 rounded-xl px-8 h-12 font-bold">Abort</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 h-12 font-bold" onClick={() => deleteMedia(file.id || file.filename)}>Confirm Purge</AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          <div className="p-6 border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-md">
                            <p className="text-xs font-black text-slate-300 truncate tracking-tight">{file.originalName || file.name}</p>
                            <div className="flex items-center gap-2 mt-2">
                               <Badge className="text-[8px] bg-slate-900 text-slate-500 border-none font-black px-1.5 py-0 uppercase">{(file.size / 1024).toFixed(1)} KB</Badge>
                               <Badge className="text-[8px] bg-blue-500/10 text-blue-500 border-none font-black px-1.5 py-0 uppercase">{file.type?.split('/')[1] || 'file'}</Badge>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* --- PORTFOLIO MANAGER --- */}
              {activeTab === "portfolio" && (
                <div className="space-y-10">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Portfolio Manager</h2>
                      <p className="text-slate-500 mt-2 font-medium">Add, edit, and showcase completed work from this dashboard tab.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Button variant="outline" onClick={() => setEditingPortfolio({ title: '', description: '', featuredImage: '', location: '', client: '', category: '', cost: '', benefit: '', status: 'completed', completionDate: new Date().toISOString().slice(0, 10) })} className="rounded-xl border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white">
                        <Plus className="w-4 h-4 mr-2" /> New Portfolio Case
                      </Button>
                      <Button onClick={loadAllData} variant="outline" className="rounded-xl border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white">
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                      </Button>
                    </div>
                  </div>

                  {editingPortfolio && (
                    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                      <CardHeader className="p-8 bg-slate-950/50 border-b border-slate-800 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <CardTitle className="text-white text-2xl font-black tracking-tight">{editingPortfolio.id ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}</CardTitle>
                          <CardDescription>{editingPortfolio.id ? 'Update fields and commit changes.' : 'Create a new completed project entry for the public portfolio.'}</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm" className="rounded-xl text-slate-400 hover:text-white" onClick={() => setEditingPortfolio(null)}>
                            Cancel
                          </Button>
                          <Button onClick={async () => {
                            setPortfolioSaving(true)
                            try {
                              const method = editingPortfolio.id ? 'PATCH' : 'POST'
                              const response = await fetch('/api/portfolio-projects', {
                                method,
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(editingPortfolio),
                              })
                              const data = await response.json()
                              if (!response.ok) throw new Error(data.error || 'Failed to save portfolio item')
                              toast({ title: 'Saved', description: editingPortfolio.id ? 'Portfolio project updated.' : 'New portfolio project created.' })
                              setEditingPortfolio(null)
                              loadAllData()
                            } catch {
                              toast({ title: 'Error', description: 'Could not save portfolio project.', variant: 'destructive' })
                            } finally {
                              setPortfolioSaving(false)
                            }
                          }} disabled={portfolioSaving} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6">
                            {portfolioSaving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Case
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-10 space-y-8">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Project Title</Label>
                              <Input value={editingPortfolio.title || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Location</Label>
                              <Input value={editingPortfolio.location || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, location: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Client</Label>
                              <Input value={editingPortfolio.client || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, client: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Category</Label>
                              <Input value={editingPortfolio.category || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Status</Label>
                              <Input value={editingPortfolio.status || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, status: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Project Cost</Label>
                              <Input value={editingPortfolio.cost || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, cost: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Cost Benefit</Label>
                              <Input value={editingPortfolio.benefit || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, benefit: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Completion Date</Label>
                              <Input type="date" value={editingPortfolio.completionDate || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, completionDate: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <div>
                              <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Featured Image URL</Label>
                              <Input value={editingPortfolio.featuredImage || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, featuredImage: e.target.value })} className="bg-slate-950 border-slate-800 h-14 rounded-2xl" />
                            </div>
                            <Button size="sm" variant="secondary" className="w-full rounded-xl h-14" onClick={() => openMediaPicker((url) => setEditingPortfolio({ ...editingPortfolio, featuredImage: url }))}>
                              <ImageIcon className="w-4 h-4 mr-2" /> Select From Media Library
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Project Description</Label>
                          <Textarea value={editingPortfolio.description || ''} onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })} className="bg-slate-950 border-slate-800 rounded-3xl min-h-[160px]" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid gap-6 xl:grid-cols-2">
                    {portfolioItems.length === 0 ? (
                      <Card className="bg-slate-900 border-slate-800 p-10 text-center">
                        <p className="text-slate-500">No portfolio projects yet. Start by adding a new case above.</p>
                      </Card>
                    ) : (
                      portfolioItems.map((item) => (
                        <Card key={item.id} className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                          <div className="relative aspect-[4/3] bg-slate-950">
                            {item.featuredImage ? (
                              <Image src={item.featuredImage} alt={item.title || 'Portfolio item'} width={400} height={300} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-slate-500">No image</div>
                            )}
                          </div>
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black">{item.status || 'Completed'}</p>
                                <h3 className="text-xl font-black text-white tracking-tight mt-2">{item.title || 'Untitled Project'}</h3>
                              </div>
                              <div className="text-right text-slate-400 text-xs">
                                {item.completionDate ? new Date(item.completionDate).toLocaleDateString() : 'No date'}
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-3">{item.description || 'No description added yet.'}</p>
                            <div className="grid grid-cols-2 gap-3 text-sm text-slate-500">
                              <div className="rounded-2xl bg-slate-950 p-3 border border-slate-800">
                                <p className="font-black text-white">Location</p>
                                <p>{item.location || '—'}</p>
                              </div>
                              <div className="rounded-2xl bg-slate-950 p-3 border border-slate-800">
                                <p className="font-black text-white">Cost</p>
                                <p>${Number(item.cost || 0).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setEditingPortfolio(item)}>
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="rounded-xl text-red-400 border border-red-500/20 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-slate-950 border border-slate-800 text-white rounded-[2rem] p-10">
                                  <AlertDialogTitle className="text-2xl font-black">Remove Portfolio Project</AlertDialogTitle>
                                  <AlertDialogDescription className="text-slate-500 mt-2 font-medium">
                                    This will permanently delete the portfolio project and remove it from the live site.
                                  </AlertDialogDescription>
                                  <div className="flex justify-end gap-4 mt-10">
                                    <AlertDialogCancel className="bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 rounded-xl px-8 h-12 font-bold">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 h-12 font-bold" onClick={() => deletePortfolioItem(item.id)}>
                                      Confirm Delete
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* --- ORDERS --- */}
              {activeTab === "orders" && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Order Management</h2>
                      <p className="text-slate-500 mt-2 font-medium">Track all transactions and payment processing.</p>
                    </div>
                    <Button onClick={loadAllData} variant="outline" className="rounded-xl border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Orders
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { label: "Total Orders", value: orders.length, icon: ClipboardList, color: "from-blue-600 to-cyan-500" },
                      { label: "Paid Orders", value: orders.filter(o => o.status === 'paid').length, icon: CheckCircle2, color: "from-green-600 to-emerald-500" },
                      { label: "Pending Orders", value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: "from-amber-600 to-orange-500" },
                    ].map((stat, i) => (
                      <Card key={i} className="bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-700 transition-all duration-300">
                        <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`} />
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                              <h3 className="text-4xl font-black text-white mt-2 tracking-tighter">{stat.value}</h3>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                               <stat.icon className="w-6 h-6 text-slate-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden rounded-[2.5rem]">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50">
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Order ID</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Customer</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Amount</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Payment Method</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Date</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="p-20 text-center text-slate-600 font-bold tracking-widest uppercase text-xs italic">No orders received yet.</td>
                              </tr>
                            ) : (
                              orders.map((order, i) => (
                                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-all duration-300 group">
                                  <td className="p-6 text-sm font-bold text-slate-400">#{order.id?.slice(-8)}</td>
                                  <td className="p-6 text-sm font-black text-white">
                                    {order.customer?.fullName || 'N/A'}
                                    <br />
                                    <span className="text-xs text-slate-500 font-medium">{order.customer?.email}</span>
                                  </td>
                                  <td className="p-6 text-sm font-bold text-green-400">${order.totalCost?.toLocaleString()}</td>
                                  <td className="p-6 text-sm">
                                    <Badge className={
                                      order.status === 'paid' ? "bg-green-600/10 text-green-400 border-green-500/20" :
                                      order.status === 'pending' ? "bg-amber-600/10 text-amber-400 border-amber-500/20" :
                                      "bg-red-600/10 text-red-400 border-red-500/20"
                                    }>
                                      {order.status || 'unknown'}
                                    </Badge>
                                  </td>
                                  <td className="p-6 text-sm font-bold text-slate-400 capitalize">{order.paymentMethod || 'N/A'}</td>
                                  <td className="p-6 text-sm font-medium text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                  <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      {order.whatsappLink && (
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-10 w-10 rounded-xl text-green-500 hover:text-white hover:bg-green-600 transition-all"
                                          onClick={() => window.open(order.whatsappLink, '_blank')}
                                          title="Send WhatsApp notification"
                                        >
                                          <MessageCircle className="w-4 h-4" />
                                        </Button>
                                      )}
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button size="sm" variant="ghost" className="h-10 w-10 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                                            <Eye className="w-4 h-4" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-4xl rounded-[3rem] p-10 overflow-hidden">
                                          <DialogHeader className="mb-8">
                                            <DialogTitle className="text-3xl font-black tracking-tight">Order Details</DialogTitle>
                                            <DialogDescription className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
                                              Order #{order.id} • {new Date(order.createdAt).toLocaleString()}
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                              <div>
                                                <h4 className="text-lg font-black text-white mb-4">Customer Information</h4>
                                                <div className="space-y-3">
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Name:</span>
                                                    <span className="text-white font-bold">{order.customer?.fullName || 'N/A'}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Email:</span>
                                                    <span className="text-white font-bold">{order.customer?.email || 'N/A'}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Phone:</span>
                                                    <span className="text-white font-bold">{order.customer?.phone || 'N/A'}</span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div>
                                                <h4 className="text-lg font-black text-white mb-4">Payment Details</h4>
                                                <div className="space-y-3">
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Method:</span>
                                                    <span className="text-white font-bold capitalize">{order.paymentMethod || 'N/A'}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Status:</span>
                                                    <Badge className={
                                                      order.status === 'paid' ? "bg-green-600/10 text-green-400 border-green-500/20" :
                                                      order.status === 'pending' ? "bg-amber-600/10 text-amber-400 border-amber-500/20" :
                                                      "bg-red-600/10 text-red-400 border-red-500/20"
                                                    }>
                                                      {order.status || 'unknown'}
                                                    </Badge>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-slate-500">Total:</span>
                                                    <span className="text-green-400 font-bold">${order.totalCost?.toLocaleString()}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="space-y-6">
                                              <div>
                                                <h4 className="text-lg font-black text-white mb-4">Order Items</h4>
                                                <div className="space-y-3">
                                                  {order.items?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                                                      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                                        <Building2 className="w-6 h-6 text-slate-400" />
                                                      </div>
                                                      <div className="flex-1">
                                                        <p className="text-white font-bold text-sm">{item.title}</p>
                                                        <p className="text-slate-500 text-xs">{item.location}</p>
                                                      </div>
                                                      <div className="text-right">
                                                        <p className="text-green-400 font-bold">${item.cost?.toLocaleString()}</p>
                                                        <p className="text-slate-500 text-xs">Qty: {item.quantity || 1}</p>
                                                      </div>
                                                    </div>
                                                  )) || <p className="text-slate-500 italic">No items found</p>}
                                                </div>
                                              </div>
                                              {order.whatsappLink && (
                                                <div>
                                                  <h4 className="text-lg font-black text-white mb-4">Quick Actions</h4>
                                                  <Button 
                                                    className="w-full bg-green-600 hover:bg-green-700 h-12 rounded-xl font-bold text-white flex items-center gap-2"
                                                    onClick={() => window.open(order.whatsappLink, '_blank')}
                                                  >
                                                    <MessageCircle className="w-4 h-4" />
                                                    Send WhatsApp Notification
                                                  </Button>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* --- SUBMISSIONS --- */}
              {activeTab === "submissions" && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tight">Leads Engine</h2>
                      <p className="text-slate-500 mt-2 font-medium">Aggregate of all inbound requests from community members.</p>
                    </div>
                  </div>

                  <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden rounded-[2.5rem]">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50">
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Origin Date</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Contributor Name</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Electronic Mail</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Request Type</th>
                              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right">Access</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="p-20 text-center text-slate-600 font-bold tracking-widest uppercase text-xs italic">No community leads detected.</td>
                              </tr>
                            ) : (
                              submissions.map((s, i) => (
                                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-all duration-300 group">
                                  <td className="p-6 text-sm font-medium text-slate-500">{new Date(s.submittedAt).toLocaleDateString()}</td>
                                  <td className="p-6 text-sm font-black text-white">{s.name || "System Record"}</td>
                                  <td className="p-6 text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">{s.email || "N/A"}</td>
                                  <td className="p-6 text-sm">
                                    <Badge className={s.formId === "start-project" ? "bg-blue-600/10 text-blue-400 border-blue-500/20" : "bg-purple-600/10 text-purple-400 border-purple-500/20"}>
                                      {s.formId || "Contact"}
                                    </Badge>
                                  </td>
                                  <td className="p-6 text-right">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" className="h-12 w-12 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                                          <Eye className="w-5 h-5" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-2xl rounded-[3rem] p-10 overflow-hidden">
                                        <DialogHeader className="mb-8">
                                          <DialogTitle className="text-3xl font-black tracking-tight">Lead Intel</DialogTitle>
                                          <DialogDescription className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Originating {new Date(s.submittedAt).toLocaleString()}</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-8">
                                          {Object.entries(s).filter(([k]) => !['id', 'submittedAt', 'formId'].includes(k)).map(([key, value]) => (
                                            <div key={key} className="space-y-2 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                                              <p className="text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">{key.replace(/([A-Z])/g, ' $1')}</p>
                                              <p className="text-sm text-slate-200 font-bold leading-relaxed">{String(value)}</p>
                                            </div>
                                          ))}
                                        </div>
                                        <DialogFooter className="mt-10">
                                           <Button className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl font-black text-lg" onClick={() => window.location.href = `mailto:${s.email}`}>Initialize Response</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

            </div>
          </main>
        </SidebarInset>

        {/* --- Global Media Picker Dialog --- */}
        <Dialog open={mediaPickerOpen} onOpenChange={setMediaPickerOpen}>
           <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-5xl h-[80vh] rounded-[3rem] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="p-10 pb-6 border-b border-slate-900">
                 <div className="flex items-center justify-between">
                    <div>
                       <DialogTitle className="text-3xl font-black tracking-tight">Select Asset</DialogTitle>
                       <DialogDescription className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Connecting to Luthfullah Media Engine</DialogDescription>
                    </div>
                    <div className="flex gap-4">
                       <Label htmlFor="media-upload-picker" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-xl flex items-center gap-2 text-xs font-black transition-all">
                          <Upload className="w-4 h-4" /> Upload New
                       </Label>
                       <input id="media-upload-picker" type="file" className="hidden" onChange={handleMediaUpload} />
                    </div>
                 </div>
              </DialogHeader>
              <ScrollArea className="flex-1 p-10">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {media.map((file, i) => (
                       <div 
                         key={i} 
                         className="aspect-square relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer group hover:border-blue-500 transition-all"
                         onClick={() => {
                            if (onMediaSelected) onMediaSelected(file.url);
                            setMediaPickerOpen(false);
                         }}
                       >
                          {file.type?.startsWith('image/') ? (
                             <Image src={file.url} alt={file.name} width={200} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          ) : (
                             <FileText className="w-10 h-10 text-slate-700 m-auto mt-10" />
                          )}
                          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="bg-white text-blue-600 p-2 rounded-full shadow-2xl">
                                <Check className="w-5 h-5 font-black" />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </ScrollArea>
              <div className="p-8 border-t border-slate-900 bg-slate-950/50 flex justify-end">
                 <Button variant="ghost" onClick={() => setMediaPickerOpen(false)} className="rounded-xl font-bold px-8 h-12">Cancel Selection</Button>
              </div>
           </DialogContent>
        </Dialog>

      </div>
    </SidebarProvider>
  )
}
