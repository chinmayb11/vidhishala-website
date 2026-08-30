'use client';

import * as React from 'react';
import { Plus, Trash2, Edit, Download, FileText, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase-client';

interface Publication {
  id: string;
  title: string;
  volume: string;
  issue_number: string | null;
  release_date: string;
  summary: string | null;
  pdf_url: string | null;
  download_count: number;
  is_published: boolean;
}

export default function AdminGazettePage() {
  const { toast } = useToast();
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Publication | null>(null);
  const [form, setForm] = React.useState({
    title: '',
    volume: '',
    issue_number: '',
    release_date: '',
    summary: '',
    pdf_url: '',
  });

  const fetchPublications = async () => {
    const { data, error } = await supabase
      .from('gazette_publications')
      .select('*')
      .order('release_date', { ascending: false });
    if (!error && data) setPublications(data as Publication[]);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPublications();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', volume: '', issue_number: '', release_date: '', summary: '', pdf_url: '' });
    setDialogOpen(true);
  };

  const openEdit = (pub: Publication) => {
    setEditing(pub);
    setForm({
      title: pub.title,
      volume: pub.volume,
      issue_number: pub.issue_number || '',
      release_date: pub.release_date,
      summary: pub.summary || '',
      pdf_url: pub.pdf_url || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase
        .from('gazette_publications')
        .update({
          title: form.title,
          volume: form.volume,
          issue_number: form.issue_number || null,
          release_date: form.release_date,
          summary: form.summary || null,
          pdf_url: form.pdf_url || null,
        })
        .eq('id', editing.id);
      if (error) {
        toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Publication Updated', description: 'Changes saved successfully.' });
    } else {
      const { error } = await supabase.from('gazette_publications').insert({
        title: form.title,
        volume: form.volume,
        issue_number: form.issue_number || null,
        release_date: form.release_date,
        summary: form.summary || null,
        pdf_url: form.pdf_url || null,
      });
      if (error) {
        toast({ title: 'Insert Failed', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Publication Added', description: 'New gazette issue created.' });
    }
    setDialogOpen(false);
    fetchPublications();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    const { error } = await supabase.from('gazette_publications').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Publication Deleted' });
    fetchPublications();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{publications.length} publications</p>
        <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
          <Plus className="h-4 w-4 mr-1" />
          New Issue
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : publications.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No publications yet.</p>
            <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy">
              <Plus className="h-4 w-4 mr-1" />
              Add First Issue
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publications.map((pub) => (
            <Card key={pub.id} className="glass-card hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">{pub.volume}</Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(pub)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive" onClick={() => handleDelete(pub.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1 line-clamp-2">{pub.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{new Date(pub.release_date).toLocaleDateString()}</p>
                {pub.summary && <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{pub.summary}</p>}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Download className="h-3 w-3" /> {pub.download_count}</span>
                  {pub.pdf_url && <a href={pub.pdf_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">View PDF</a>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Publication' : 'New Gazette Issue'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" required value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} placeholder="Volume 3 (2025)" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="issue">Issue Number</Label>
                <Input id="issue" value={form.issue_number} onChange={(e) => setForm({ ...form, issue_number: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="date">Release Date</Label>
              <Input id="date" type="date" required value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="mt-1 min-h-[80px]" />
            </div>
            <div>
              <Label htmlFor="pdf">PDF URL</Label>
              <Input id="pdf" value={form.pdf_url} onChange={(e) => setForm({ ...form, pdf_url: e.target.value })} placeholder="https://..." className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
              {editing ? 'Save Changes' : 'Create Publication'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
