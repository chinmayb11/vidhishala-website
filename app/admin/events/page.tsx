'use client';

import * as React from 'react';
import { Plus, Trash2, Edit, Calendar, Star } from 'lucide-react';
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
import { adminApi } from '@/lib/admin-api';

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  venue: string | null;
  registration_url: string | null;
  prospectus_url: string | null;
  status: string;
  is_featured: boolean;
}

export default function AdminEventsPage() {
  const { toast } = useToast();
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<EventItem | null>(null);
  const [form, setForm] = React.useState({
    title: '', description: '', event_date: '', venue: '', registration_url: '', prospectus_url: '', status: 'upcoming', is_featured: false,
  });

  const fetchEvents = async () => {
    const { data, error } = await adminApi.from('events').select('*').order('event_date', { ascending: false });
    if (!error && data) setEvents(data as EventItem[]);
    setLoading(false);
  };

  React.useEffect(() => { fetchEvents(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', event_date: '', venue: '', registration_url: '', prospectus_url: '', status: 'upcoming', is_featured: false });
    setDialogOpen(true);
  };

  const openEdit = (ev: EventItem) => {
    setEditing(ev);
    setForm({
      title: ev.title, description: ev.description || '', event_date: ev.event_date || '',
      venue: ev.venue || '', registration_url: ev.registration_url || '',
      prospectus_url: ev.prospectus_url || '', status: ev.status, is_featured: ev.is_featured,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description || null,
      event_date: form.event_date || null,
      venue: form.venue || null,
      registration_url: form.registration_url || null,
      prospectus_url: form.prospectus_url || null,
      status: form.status,
      is_featured: form.is_featured,
    };
    if (editing) {
      const { error } = await adminApi.from('events').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'Update Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Event Updated' });
    } else {
      const { error } = await adminApi.from('events').insert(payload);
      if (error) { toast({ title: 'Insert Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Event Created' });
    }
    setDialogOpen(false);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    const { error } = await adminApi.from('events').delete().eq('id', id);
    if (error) { toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Event Deleted' });
    fetchEvents();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{events.length} events</p>
        <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
          <Plus className="h-4 w-4 mr-1" /> Add Event
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : events.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No events yet.</p>
            <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy">
              <Plus className="h-4 w-4 mr-1" /> Add First Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <Card key={ev.id} className="glass-card hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={ev.status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">{ev.status}</Badge>
                    {ev.is_featured && <Star className="h-3 w-3 text-gold fill-gold" />}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(ev)}><Edit className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive" onClick={() => handleDelete(ev.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">{ev.title}</h3>
                {ev.event_date && <p className="text-xs text-muted-foreground mb-1">{new Date(ev.event_date).toLocaleDateString()}</p>}
                {ev.venue && <p className="text-xs text-muted-foreground mb-2">{ev.venue}</p>}
                {ev.description && <p className="text-xs text-muted-foreground line-clamp-2">{ev.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Event' : 'New Event'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="ev-title">Title</Label>
              <Input id="ev-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="ev-desc">Description</Label>
              <Textarea id="ev-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ev-date">Event Date</Label>
                <Input id="ev-date" type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="ev-venue">Venue</Label>
                <Input id="ev-venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="ev-reg">Registration URL</Label>
              <Input id="ev-reg" value={form.registration_url} onChange={(e) => setForm({ ...form, registration_url: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="ev-pros">Prospectus URL</Label>
              <Input id="ev-pros" value={form.prospectus_url} onChange={(e) => setForm({ ...form, prospectus_url: e.target.value })} className="mt-1" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              Featured event
            </label>
            <Button type="submit" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
              {editing ? 'Save Changes' : 'Create Event'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
