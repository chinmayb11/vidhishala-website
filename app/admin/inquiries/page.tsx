'use client';

import * as React from 'react';
import { Trash2, Inbox, Filter, Mail, Phone, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/lib/admin-api';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  purpose: string;
  message: string | null;
  status: string;
  created_at: string;
}

export default function AdminInquiriesPage() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState('all');

  const fetchInquiries = async () => {
    let query = adminApi.from('inquiries').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    const { data, error } = await query;
    if (!error && data) setInquiries(data as Inquiry[]);
    setLoading(false);
  };

  React.useEffect(() => { fetchInquiries(); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await adminApi.from('inquiries').update({ status }).eq('id', id);
    if (error) { toast({ title: 'Update Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Status Updated', description: `Inquiry marked as ${status}.` });
    fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const { error } = await adminApi.from('inquiries').delete().eq('id', id);
    if (error) { toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Inquiry Deleted' });
    fetchInquiries();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{inquiries.length} inquiries</p>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><Filter className="h-4 w-4 mr-1" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : inquiries.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No inquiries found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <Card key={inq.id} className="glass-card hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-sm">{inq.name}</h3>
                      <Badge variant="outline" className="text-xs">{inq.purpose}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {inq.email}</span>
                      {inq.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {inq.phone}</span>}
                      {inq.organization && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {inq.organization}</span>}
                      <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                    </div>
                    {inq.message && <p className="text-sm text-muted-foreground mt-2">{inq.message}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select value={inq.status} onValueChange={(v) => updateStatus(inq.id, v)}>
                      <SelectTrigger className="w-28 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(inq.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
