'use client';

import * as React from 'react';
import { Download, Trash2, GraduationCap, Filter } from 'lucide-react';
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

interface Application {
  id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  institution: string | null;
  program_type: string;
  cover_letter: string | null;
  status: string;
  created_at: string;
}

export default function AdminApplicationsPage() {
  const { toast } = useToast();
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [programFilter, setProgramFilter] = React.useState('all');

  const fetchApplications = async () => {
    if (!adminApi) {
      setLoading(false);
      return;
    }

    let query = adminApi.from('internship_applications').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    if (programFilter !== 'all') query = query.eq('program_type', programFilter);
    const { data, error } = await query;
    if (!error && data) setApplications(data as Application[]);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchApplications();
  }, [statusFilter, programFilter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await adminApi.from('internship_applications').update({ status }).eq('id', id);
    if (error) {
      toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Status Updated', description: `Application marked as ${status}.` });
    fetchApplications();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    const { error } = await adminApi.from('internship_applications').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Application Deleted' });
    fetchApplications();
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Institution', 'Program', 'Status', 'Date'];
    const rows = applications.map((a) => [
      a.applicant_name, a.email, a.phone || '', a.institution || '', a.program_type, a.status, new Date(a.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36"><Filter className="h-4 w-4 mr-1" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="All Programs" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="LIP">Library Internship</SelectItem>
              <SelectItem value="Hybrid">Hybrid Internship</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={exportCSV} disabled={applications.length === 0}>
          <Download className="h-4 w-4 mr-1" />
          Export CSV
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : applications.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No applications found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="glass-card hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-sm">{app.applicant_name}</h3>
                      <Badge variant="secondary" className="text-xs">{app.program_type}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span>{app.email}</span>
                      {app.phone && <span>{app.phone}</span>}
                      {app.institution && <span>{app.institution}</span>}
                      <span>{new Date(app.created_at).toLocaleDateString()}</span>
                    </div>
                    {app.cover_letter && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{app.cover_letter}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v)}>
                      <SelectTrigger className="w-28 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(app.id)}>
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
