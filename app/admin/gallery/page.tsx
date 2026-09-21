'use client';

import * as React from 'react';
import { Plus, Trash2, Edit, Images, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/admin-api';

interface MediaItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  media_type: string;
  media_url: string | null;
  event_date: string | null;
}

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<MediaItem | null>(null);
  const [form, setForm] = React.useState({
    title: '', description: '', category: 'rlf', media_type: 'photo', media_url: '', event_date: '',
  });

  const fetchItems = async () => {
    const { data, error } = await adminApi.from('gallery_media').select('*').order('created_at', { ascending: false });
    if (!error && data) setItems(data as MediaItem[]);
    setLoading(false);
  };

  React.useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', category: 'rlf', media_type: 'photo', media_url: '', event_date: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: MediaItem) => {
    setEditing(item);
    setForm({
      title: item.title, description: item.description || '', category: item.category,
      media_type: item.media_type, media_url: item.media_url || '', event_date: item.event_date || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title, description: form.description || null, category: form.category,
      media_type: form.media_type, media_url: form.media_url || null,
      event_date: form.event_date || null,
    };
    if (editing) {
      const { error } = await adminApi.from('gallery_media').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'Update Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Media Updated' });
    } else {
      const { error } = await adminApi.from('gallery_media').insert(payload);
      if (error) { toast({ title: 'Insert Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Media Added' });
    }
    setDialogOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item?')) return;
    const { error } = await adminApi.from('gallery_media').delete().eq('id', id);
    if (error) { toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Media Deleted' });
    fetchItems();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} media items</p>
        <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
          <Plus className="h-4 w-4 mr-1" /> Add Media
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : items.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Images className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No media items yet.</p>
            <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy">
              <Upload className="h-4 w-4 mr-1" /> Add First Item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="glass-card hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-navy to-navy-light rounded-lg mb-3 flex items-center justify-center">
                  {item.media_url ? (
                    <img src={item.media_url} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Images className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-start justify-between mb-1">
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openEdit(item)}><Edit className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xs line-clamp-1">{item.title}</h3>
                {item.event_date && <p className="text-xs text-muted-foreground">{new Date(item.event_date).toLocaleDateString()}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Media' : 'Add Media Item'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="g-title">Title</Label>
              <Input id="g-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="g-desc">Description</Label>
              <Textarea id="g-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 min-h-[60px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="g-cat">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger id="g-cat" className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rlf">Rajasthan Law Festival</SelectItem>
                    <SelectItem value="lip">Library Internships</SelectItem>
                    <SelectItem value="school">School Workshops</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="g-type">Media Type</Label>
                <Select value={form.media_type} onValueChange={(v) => setForm({ ...form, media_type: v })}>
                  <SelectTrigger id="g-type" className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="g-url">Media URL</Label>
              <Input id="g-url" value={form.media_url} onChange={(e) => setForm({ ...form, media_url: e.target.value })} placeholder="https://..." className="mt-1" />
            </div>
            <div>
              <Label htmlFor="g-date">Event Date</Label>
              <Input id="g-date" type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
              {editing ? 'Save Changes' : 'Add Media'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
