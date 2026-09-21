'use client';

import * as React from 'react';
import { Edit3, FileText, Plus, Save, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/admin-api';

type ContentSection = { heading?: string; paragraphs?: string[]; bullets?: string[] };
type PageContent = { contentKey?: string; eyebrow: string; title: string; intro?: string; sections: ContentSection[]; cta?: { label: string; href: string } };
type PageRecord = { id: string; slug: string; title: string; content: PageContent; is_published: boolean };

const emptyPage = (): PageContent => ({ eyebrow: 'Website', title: 'New Page', intro: '', sections: [{ heading: '', paragraphs: [''], bullets: [] }], cta: { label: '', href: '' } });

export default function AdminContentPage() {
  const { toast } = useToast();
  const [pages, setPages] = React.useState<PageRecord[]>([]);
  const [selected, setSelected] = React.useState<PageRecord | null>(null);
  const [draft, setDraft] = React.useState<PageContent>(emptyPage());
  const [slug, setSlug] = React.useState('');
  const [published, setPublished] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const loadPages = async () => {
    const result = await adminApi.from('page_content').select('*').order('title');
    if (result.data) setPages(result.data as PageRecord[]);
    setLoading(false);
  };

  React.useEffect(() => { loadPages(); }, []);

  const selectPage = (page: PageRecord) => {
    setSelected(page);
    setSlug(page.slug);
    setDraft({ ...page.content, sections: page.content.sections?.length ? page.content.sections : [{ paragraphs: [''] }] });
    setPublished(page.is_published !== false);
  };

  const updateSection = (index: number, update: Partial<ContentSection>) => {
    setDraft((current) => ({ ...current, sections: current.sections.map((section, sectionIndex) => sectionIndex === index ? { ...section, ...update } : section) }));
  };

  const savePage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!slug.trim() || !draft.title.trim()) return;
    setSaving(true);
    const content = { ...draft, contentKey: slug.trim() };
    const payload = { slug: slug.trim(), title: content.title, content, is_published: published };
    const result = selected
      ? await adminApi.from('page_content').update(payload).eq('id', selected.id)
      : await adminApi.from('page_content').insert(payload);
    setSaving(false);
    if (result.error) {
      toast({ title: 'Could not save page', description: result.error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Page published', description: 'The public website will use this content immediately.' });
    await loadPages();
  };

  const deletePage = async () => {
    if (!selected || !confirm('Delete this custom page content and restore the built-in copy?')) return;
    const result = await adminApi.from('page_content').delete().eq('id', selected.id);
    if (result.error) { toast({ title: 'Could not delete page', description: result.error.message, variant: 'destructive' }); return; }
    setSelected(null);
    setDraft(emptyPage());
    await loadPages();
  };

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <Card className="glass-card min-w-0">
        <CardHeader className="flex-row items-center justify-between space-y-0"><CardTitle className="font-heading text-xl">Website Pages</CardTitle><Button size="icon" variant="ghost" title="Create page" onClick={() => { setSelected(null); setSlug(''); setDraft(emptyPage()); setPublished(true); }}><Plus className="h-4 w-4" /></Button></CardHeader>
        <CardContent className="space-y-1 p-3">
          {loading ? <p className="p-3 text-sm text-muted-foreground">Loading pages...</p> : pages.map((page) => <button key={page.id} type="button" onClick={() => selectPage(page)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${selected?.id === page.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}><FileText className="h-4 w-4 shrink-0" /><span className="min-w-0 flex-1 truncate">{page.title}</span><Badge variant="outline" className="text-[10px]">{page.is_published === false ? 'Draft' : 'Live'}</Badge></button>)}</CardContent>
      </Card>

      <Card className="glass-card min-w-0">
        <CardHeader className="flex-col items-start justify-between gap-3 space-y-0 border-b border-border/40 sm:flex-row sm:items-center"><div><CardTitle className="font-heading text-xl">{selected ? 'Edit Page Content' : 'Create Page Content'}</CardTitle><p className="mt-1 text-xs text-muted-foreground">Edit copy and sections without touching code.</p></div>{selected && <Button type="button" variant="ghost" className="text-destructive" onClick={deletePage}><Trash2 className="mr-2 h-4 w-4" />Restore Built-in Copy</Button>}</CardHeader>
        <CardContent className="p-4 sm:p-6"><form onSubmit={savePage} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="content-slug">Page key</Label><Input id="content-slug" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="e.g. organisation" className="mt-1" required /></div><div><Label htmlFor="content-eyebrow">Eyebrow</Label><Input id="content-eyebrow" value={draft.eyebrow} onChange={(event) => setDraft({ ...draft, eyebrow: event.target.value })} className="mt-1" /></div></div>
          <div><Label htmlFor="content-title">Title</Label><Input id="content-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1" required /></div>
          <div><Label htmlFor="content-intro">Intro</Label><Textarea id="content-intro" value={draft.intro || ''} onChange={(event) => setDraft({ ...draft, intro: event.target.value })} className="mt-1 min-h-24" /></div>
          <div className="space-y-4"><div className="flex items-center justify-between"><h3 className="font-heading text-lg font-semibold">Sections</h3><Button type="button" variant="outline" size="sm" onClick={() => setDraft({ ...draft, sections: [...draft.sections, { heading: '', paragraphs: [''], bullets: [] }] })}><Plus className="mr-2 h-4 w-4" />Add Section</Button></div>{draft.sections.map((section, index) => <div key={index} className="space-y-3 rounded-lg border border-border/60 p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-primary">Section {index + 1}</p>{draft.sections.length > 1 && <Button type="button" variant="ghost" size="icon" title="Remove section" onClick={() => setDraft({ ...draft, sections: draft.sections.filter((_, sectionIndex) => sectionIndex !== index) })}><Trash2 className="h-4 w-4 text-destructive" /></Button>}</div><Input placeholder="Section heading" value={section.heading || ''} onChange={(event) => updateSection(index, { heading: event.target.value })} /><Textarea placeholder="Paragraphs, one per line" value={(section.paragraphs || []).join('\n')} onChange={(event) => updateSection(index, { paragraphs: event.target.value.split('\n') })} className="min-h-28" /><Textarea placeholder="Bullet points, one per line" value={(section.bullets || []).join('\n')} onChange={(event) => updateSection(index, { bullets: event.target.value.split('\n').filter(Boolean) })} className="min-h-20" /></div>)}</div>
          <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="content-cta-label">CTA label</Label><Input id="content-cta-label" value={draft.cta?.label || ''} onChange={(event) => setDraft({ ...draft, cta: { label: event.target.value, href: draft.cta?.href || '' } })} className="mt-1" /></div><div><Label htmlFor="content-cta-href">CTA link</Label><Input id="content-cta-href" value={draft.cta?.href || ''} onChange={(event) => setDraft({ ...draft, cta: { label: draft.cta?.label || '', href: event.target.value } })} className="mt-1" /></div></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} /> Publish this content on the public website</label>
          <Button type="submit" disabled={saving} className="bg-[#7A0C0C] text-white hover:bg-[#4A0808]"><Save className="mr-2 h-4 w-4" />{saving ? 'Saving...' : 'Save & Publish'}</Button>
        </form></CardContent>
      </Card>
    </div>
  );
}