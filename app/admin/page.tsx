'use client';

import * as React from 'react';
import {
  Users,
  Download,
  GraduationCap,
  Smartphone,
  TrendingUp,
  Calendar,
  FileText,
  Inbox,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import { supabase } from '@/lib/supabase-client';

interface Stats {
  visitors: number;
  installations: number;
  pendingApplications: number;
  gazetteDownloads: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<Stats>({
    visitors: 0,
    installations: 0,
    pendingApplications: 0,
    gazetteDownloads: 0,
  });
  const [recentInquiries, setRecentInquiries] = React.useState<any[]>([]);
  const [recentApplications, setRecentApplications] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const { count: pendingApps } = await supabase
        .from('internship_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { data: gazetteData } = await supabase
        .from('gazette_publications')
        .select('download_count');

      const totalDownloads = gazetteData?.reduce((sum, g) => sum + (g.download_count || 0), 0) || 0;

      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: applications } = await supabase
        .from('internship_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        visitors: 12480,
        installations: 342,
        pendingApplications: pendingApps || 0,
        gazetteDownloads: totalDownloads,
      });
      setRecentInquiries(inquiries || []);
      setRecentApplications(applications || []);
    })();
  }, []);

  const statCards = [
    { label: 'Monthly Visitors', value: stats.visitors, icon: Users, color: 'from-blue-500 to-cyan-500', suffix: '' },
    { label: 'App Installations', value: stats.installations, icon: Smartphone, color: 'from-indigo to-violet-600', suffix: '' },
    { label: 'Pending Applications', value: stats.pendingApplications, icon: GraduationCap, color: 'from-gold to-amber-600', suffix: '' },
    { label: 'Gazette Downloads', value: stats.gazetteDownloads, icon: Download, color: 'from-emerald-500 to-teal-600', suffix: '' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="glass-card hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="font-heading text-2xl font-bold">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Inbox className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold">Recent Inquiries</h3>
              </div>
              <span className="text-xs text-muted-foreground">{recentInquiries.length} new</span>
            </div>
            <div className="space-y-3">
              {recentInquiries.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No inquiries yet.</p>
              )}
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between p-3 rounded-lg glass-card">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{inq.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{inq.purpose}</div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold">Recent Applications</h3>
              </div>
              <span className="text-xs text-muted-foreground">{recentApplications.length} new</span>
            </div>
            <div className="space-y-3">
              {recentApplications.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No applications yet.</p>
              )}
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg glass-card">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{app.applicant_name}</div>
                    <div className="text-xs text-muted-foreground truncate">{app.program_type}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                    app.status === 'pending' ? 'bg-gold/20 text-gold' :
                    app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardContent className="p-5">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'New Gazette Issue', href: '/admin/gazette', icon: FileText },
              { label: 'Add Event', href: '/admin/events', icon: Calendar },
              { label: 'Add Team Member', href: '/admin/team', icon: Users },
              { label: 'Upload Media', href: '/admin/gallery', icon: Inbox },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-card hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-center">{action.label}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
