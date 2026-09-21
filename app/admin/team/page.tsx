'use client';

import * as React from 'react';
import { Plus, Trash2, Edit, Users, ArrowUp, ArrowDown } from 'lucide-react';
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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  expertise: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  display_order: number;
}

const categories = ['advisory', 'governing', 'executive', 'editors'];

export default function AdminTeamPage() {
  const { toast } = useToast();
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TeamMember | null>(null);
  const [form, setForm] = React.useState({
    name: '', role: '', category: 'advisory', expertise: '', bio: '', photo_url: '', linkedin_url: '', email: '', display_order: 0,
  });

  const fetchMembers = async () => {
    const { data, error } = await adminApi.from('team_members').select('*').order('display_order', { ascending: true });
    if (!error && data) setMembers(data as TeamMember[]);
    setLoading(false);
  };

  React.useEffect(() => { fetchMembers(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', role: '', category: 'advisory', expertise: '', bio: '', photo_url: '', linkedin_url: '', email: '', display_order: 0 });
    setDialogOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name, role: m.role, category: m.category, expertise: m.expertise || '',
      bio: m.bio || '', photo_url: m.photo_url || '', linkedin_url: m.linkedin_url || '',
      email: m.email || '', display_order: m.display_order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name, role: form.role, category: form.category,
      expertise: form.expertise || null, bio: form.bio || null,
      photo_url: form.photo_url || null, linkedin_url: form.linkedin_url || null,
      email: form.email || null, display_order: form.display_order,
    };
    if (editing) {
      const { error } = await adminApi.from('team_members').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'Update Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Member Updated' });
    } else {
      const { error } = await adminApi.from('team_members').insert(payload);
      if (error) { toast({ title: 'Insert Failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Member Added' });
    }
    setDialogOpen(false);
    fetchMembers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    const { error } = await adminApi.from('team_members').delete().eq('id', id);
    if (error) { toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Member Removed' });
    fetchMembers();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{members.length} members</p>
        <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
          <Plus className="h-4 w-4 mr-1" /> Add Member
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : members.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No team members yet.</p>
            <Button onClick={openAdd} className="bg-gradient-to-r from-gold to-amber-600 text-navy">
              <Plus className="h-4 w-4 mr-1" /> Add First Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <Card key={m.id} className="glass-card hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">{m.category}</Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(m)}><Edit className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive" onClick={() => handleDelete(m.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-sm">{m.name}</h3>
                <p className="text-xs text-primary mb-1">{m.role}</p>
                {m.expertise && <p className="text-xs text-muted-foreground">{m.expertise}</p>}
                {m.bio && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{m.bio}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Member' : 'Add Team Member'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="m-name">Name</Label>
              <Input id="m-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="m-role">Role</Label>
              <Input id="m-role" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="m-cat">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger id="m-cat" className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="advisory">Advisory Board</SelectItem>
                  <SelectItem value="governing">Governing Body</SelectItem>
                  <SelectItem value="executive">Executive Leads</SelectItem>
                  <SelectItem value="editors">Student Editors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="m-exp">Expertise</Label>
              <Input id="m-exp" value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="m-bio">Bio</Label>
              <Textarea id="m-bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1 min-h-[60px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="m-email">Email</Label>
                <Input id="m-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="m-order">Display Order</Label>
                <Input id="m-order" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="m-photo">Photo URL</Label>
              <Input id="m-photo" value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="m-linkedin">LinkedIn URL</Label>
              <Input id="m-linkedin" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy font-semibold">
              {editing ? 'Save Changes' : 'Add Member'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
