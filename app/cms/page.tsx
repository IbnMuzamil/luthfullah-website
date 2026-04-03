'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Plus, Eye, Download, Upload, Settings } from 'lucide-react';

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState('forms');
  const [forms, setForms] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);
  const [editingPage, setEditingPage] = useState<any>(null);

  // Load all data
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'forms' || activeTab === 'submissions') {
        const [formsRes, submissionsRes] = await Promise.all([
          fetch('/api/forms'),
          fetch('/api/submissions'),
        ]);
        setForms(await formsRes.json());
        setSubmissions(await submissionsRes.json());
      }
      if (activeTab === 'pages') {
        const res = await fetch('/api/pages');
        setPages(await res.json());
      }
      if (activeTab === 'media') {
        const res = await fetch('/api/media');
        setMedia(await res.json());
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    setLoading(false);
  };

  // Forms Tab
  const handleCreateForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newForm = {
      name: formData.get('name'),
      description: formData.get('description'),
      fields: JSON.parse(formData.get('fields') as string || '[]'),
    };
    try {
      await fetch('/api/forms', { method: 'POST', body: JSON.stringify(newForm) });
      loadData();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to create form:', error);
    }
  };

  const handleDeleteForm = async (id: string) => {
    try {
      await fetch(`/api/forms?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Failed to delete form:', error);
    }
  };

  // Pages Tab
  const handleCreatePage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPage = {
      title: formData.get('title'),
      content: formData.get('content'),
      published: true,
    };
    try {
      await fetch('/api/pages', { method: 'POST', body: JSON.stringify(newPage) });
      loadData();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to create page:', error);
    }
  };

  const handleDeletePage = async (id: string) => {
    try {
      await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  };

  // Media Upload
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/media', { method: 'POST', body: formData });
      loadData();
    } catch (error) {
      console.error('Failed to upload media:', error);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  };

  // Delete submission
  const handleDeleteSubmission = async (id: string) => {
    try {
      await fetch(`/api/submissions?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Failed to delete submission:', error);
    }
  };

  // Export submissions as CSV
  const handleExportSubmissions = () => {
    const csv = submissions.map(s => Object.values(s).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Super Admin Dashboard</h1>
          <p className="text-slate-400">Manage your entire website without coding</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start gap-2 bg-slate-800 mb-8">
            <TabsTrigger value="forms" className="gap-2">
              📋 Forms
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              📨 Submissions
            </TabsTrigger>
            <TabsTrigger value="pages" className="gap-2">
              📄 Pages
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2">
              🖼️ Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create New Form</CardTitle>
                <CardDescription>Build contact forms, surveys, newsletters, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateForm} className="space-y-4">
                  <Input name="name" placeholder="Form name (e.g., Contact Us)" required className="bg-slate-700 border-slate-600 text-white" />
                  <Textarea name="description" placeholder="Form description" className="bg-slate-700 border-slate-600 text-white" />
                  <Textarea
                    name="fields"
                    placeholder='JSON fields: [{"name":"email","type":"email","required":true}]'
                    defaultValue="[]"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    <Plus className="w-4 h-4" /> Create Form
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {forms.map((form) => (
                <Card key={form.id} className="bg-slate-800 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{form.name}</CardTitle>
                      <CardDescription>{form.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete Form?</AlertDialogTitle>
                          <AlertDialogDescription>This will delete the form and all its submissions</AlertDialogDescription>
                          <AlertDialogAction onClick={() => handleDeleteForm(form.id)}>Delete</AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Form Submissions ({submissions.length})</h2>
              {submissions.length > 0 && (
                <Button onClick={handleExportSubmissions} className="gap-2">
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {submissions.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="pt-6 text-center">
                    <p className="text-slate-400">No submissions yet</p>
                  </CardContent>
                </Card>
              ) : (
                submissions.map((submission) => (
                  <Card key={submission.id} className="bg-slate-800 border-slate-700">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div className="flex-1">
                        <p className="text-slate-400 text-sm">Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
                        <pre className="text-white text-sm mt-2 bg-slate-900 p-4 rounded overflow-x-auto">
                          {JSON.stringify(submission, null, 2)}
                        </pre>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
                          <AlertDialogAction onClick={() => handleDeleteSubmission(submission.id)}>Delete</AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create New Page</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePage} className="space-y-4">
                  <Input name="title" placeholder="Page title" required className="bg-slate-700 border-slate-600 text-white" />
                  <Textarea name="content" placeholder="Page content (supports HTML)" required className="bg-slate-700 border-slate-600 text-white h-48" />
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Plus className="w-4 h-4 mr-2" /> Create Page
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {pages.map((page) => (
                <Card key={page.id} className="bg-slate-800 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{page.title}</CardTitle>
                      <CardDescription>/{page.slug}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete Page?</AlertDialogTitle>
                          <AlertDialogDescription>This will delete the page permanently</AlertDialogDescription>
                          <AlertDialogAction onClick={() => handleDeletePage(page.id)}>Delete</AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Upload Media</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-center justify-center border-2 border-dashed border-slate-600 rounded-lg p-8 cursor-pointer hover:border-slate-500 transition">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-white">Click to upload images or files</p>
                  </div>
                  <input type="file" onChange={handleMediaUpload} className="hidden" accept="image/*,.pdf" />
                </label>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.map((item) => (
                <Card key={item.id} className="bg-slate-800 border-slate-700 overflow-hidden">
                  {item.type.startsWith('image/') && (
                    <img src={item.url} alt={item.originalName} className="w-full h-48 object-cover" />
                  )}
                  <CardContent className="pt-4">
                    <p className="text-white text-sm truncate">{item.originalName}</p>
                    <p className="text-slate-400 text-xs">{(item.size / 1024).toFixed(2)} KB</p>
                    <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => handleDeleteMedia(item.id)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Dashboard Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900 p-4 rounded">
                  <p className="text-white font-semibold mb-2">API Endpoints</p>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>📋 Forms: <code>/api/forms</code></li>
                    <li>📨 Submissions: <code>/api/submissions</code></li>
                    <li>📄 Pages: <code>/api/pages</code></li>
                    <li>🖼️ Media: <code>/api/media</code></li>
                  </ul>
                </div>
                <div className="bg-blue-900 p-4 rounded">
                  <p className="text-white font-semibold">💡 Tip:</p>
                  <p className="text-slate-200 text-sm">All data is stored in <code>/data</code> as JSON files. You can back them up, edit them directly, or integrate with a database later.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
