'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Download,
  Edit3,
  Eye,
  FileText,
  FolderOpen,
  Images,
  Newspaper,
  PieChart as PieChartIcon,
  Plus,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UpdateItem {
  id: string;
  title: string;
  type: string;
  section: string;
  date: string;
  status: string;
  href: string;
  image?: string | null;
}

const tree = [
  { label: 'Home', href: '/' },
  { label: 'About Us', children: [{ label: 'About the Organisation', href: '/about/organisation' }, { label: 'Aim & Objective', href: '/about/aim-objective' }, { label: 'Our Team', href: '/team' }, { label: 'Advisory Board', href: '/about/advisory-board' }] },
  { label: 'Activities & Gallery', children: [{ label: 'Internship Programmes', href: '/programs/internships', children: [{ label: 'NITP', href: '/programs/internships/nitp' }, { label: 'Regular Internship', href: '/programs/internships/regular' }, { label: 'LIP', href: '/programs/internships/lip' }] }, { label: 'Pandit A.L. Sharma Debate Competition', href: '/programs/debate' }, { label: 'Educational Visits', href: '/programs/educational-visits' }, { label: 'Workshops, Seminars & Conferences', href: '/programs/workshops' }, { label: 'Social Welfare Activities', href: '/programs/social-welfare' }, { label: 'Gallery', href: '/gallery' }] },
  { label: 'Publications & Research', children: [{ label: 'The Vidhi Gazette', href: '/vidhi-gazette' }, { label: 'Rajasthan Law Journal', href: '/resources/journal' }, { label: 'Blogs, Articles & Research Papers', href: '/resources/blogs' }, { label: 'Press Releases', href: '/resources/press-releases' }, { label: 'Research & Development', href: '/resources/rnd' }] },
  { label: 'Rajasthan Law Fest', href: '/rajasthan-law-festival' },
  { label: 'Contact Us', href: '/contact' },
];

function TreeNode({ node, depth = 0 }: { node: any; depth?: number }) {
  const [open, setOpen] = React.useState(depth < 1);
  const hasChildren = Boolean(node.children?.length);
  return <div className="min-w-0 text-xs"><div className="flex min-w-0 items-center gap-1" style={{ paddingLeft: `${depth * 12}px` }}>{hasChildren && <button className="shrink-0 rounded p-0.5 hover:bg-muted" onClick={() => setOpen((value) => !value)} aria-label={`${open ? 'Collapse' : 'Expand'} ${node.label}`}>{open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}</button>}{node.href ? <Link href={node.href} className="min-w-0 truncate py-1 text-foreground/80 hover:text-primary">{node.label}</Link> : <button onClick={() => setOpen((value) => !value)} className="min-w-0 truncate py-1 text-left font-semibold text-foreground/80 hover:text-primary">{node.label}</button>}</div>{open && hasChildren && node.children.map((child: any) => <TreeNode key={child.label} node={child} depth={depth + 1} />)}</div>;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = React.useState(false);
  const [counts] = React.useState({ pages: 41, articles: 12, events: 8, images: 36 });
  const [updates] = React.useState<UpdateItem[]>([
    { id: 'welcome-event', title: 'Rajasthan Law Festival', type: 'Event', section: 'Rajasthan Law Fest', date: '2026-09-01', status: 'Published', href: '/admin/events' },
    { id: 'welcome-gazette', title: 'The Vidhi Gazette', type: 'Publication', section: 'The Vidhi Gazette', date: '2026-08-25', status: 'Published', href: '/admin/gazette' },
    { id: 'welcome-gallery', title: 'Vidhishala Activities', type: 'Gallery', section: 'Image Gallery', date: '2026-08-18', status: 'Published', href: '/admin/gallery' },
  ]);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const kpis = [
    { label: 'Total Pages', value: counts.pages, icon: FileText, href: '/admin/settings', tone: 'bg-[#7A0C0C]/10 text-[#7A0C0C]' },
    { label: 'Blogs & Articles', value: counts.articles, icon: Newspaper, href: '/admin/gazette', tone: 'bg-[#4A0808]/10 text-[#4A0808]' },
    { label: 'Events', value: counts.events, icon: CalendarDays, href: '/admin/events', tone: 'bg-[#B08D57]/20 text-[#4A0808]' },
    { label: 'Images', value: counts.images, icon: Images, href: '/admin/gallery', tone: 'bg-emerald-700/10 text-emerald-700' },
  ];

  const storage = [{ name: 'Used', value: 65 }, { name: 'Free', value: 35 }];
  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return <div className="min-w-0 space-y-6">
    <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end"><div className="min-w-0"><p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">Vidhishala CMS</p><h1 className="font-heading text-3xl font-bold text-[#4A0808] dark:text-[#F8F5F3]">Dashboard</h1><p className="text-sm text-muted-foreground">Welcome back. Here&apos;s an overview of your website.</p></div><div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" />{today}</div></div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi) => <Card key={kpi.label} className="glass-card min-w-0"><CardContent className="p-4 sm:p-5"><div className="flex items-start justify-between gap-2"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${kpi.tone}`}><kpi.icon className="h-5 w-5" /></span><Link href={kpi.href} className="text-right text-xs text-primary hover:underline">{kpi.label === 'Total Pages' ? 'View All' : 'Manage'} <ArrowRight className="inline h-3 w-3" /></Link></div><div className="mt-4 font-heading text-3xl font-bold">{loading ? '—' : kpi.value}</div><p className="mt-1 text-xs text-muted-foreground">{kpi.label}</p></CardContent></Card>)}</div>

    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0 space-y-6">
        <Card className="glass-card min-w-0"><CardHeader className="flex-col items-start justify-between gap-2 space-y-0 border-b border-border/40 pb-4 sm:flex-row sm:items-center"><CardTitle className="font-heading text-xl">Recent Updates</CardTitle><Link href="/admin/events" className="text-xs font-semibold text-primary hover:underline">View All <ArrowRight className="inline h-3 w-3" /></Link></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3">Title</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Section</th><th className="px-3 py-3">Date</th><th className="px-3 py-3">Status</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody>{updates.map((item) => <tr key={`${item.type}-${item.id}`} className="border-t border-border/40"><td className="max-w-[230px] px-5 py-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded bg-[#F8F5F3] dark:bg-[#4A0808]">{item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : <FileText className="h-4 w-4 text-primary" />}</div><span className="truncate font-medium">{item.title}</span></div></td><td className="px-3 py-3"><Badge variant="secondary" className="text-[10px]">{item.type}</Badge></td><td className="px-3 py-3 text-xs text-muted-foreground">{item.section}</td><td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('en-IN')}</td><td className="px-3 py-3"><span className="rounded-full bg-emerald-600/15 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{item.status}</span></td><td className="px-5 py-3"><div className="flex justify-end gap-1"><Link href={item.href} title="Edit"><Button variant="ghost" size="icon" className="h-7 w-7"><Edit3 className="h-3.5 w-3.5" /></Button></Link><Link href={item.href} title="Preview" target="_blank"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button></Link><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></Button></div></td></tr>)}</tbody></table>{!loading && updates.length === 0 && <p className="p-10 text-center text-sm text-muted-foreground">No updates yet. Create content to see it here.</p>}</div></CardContent></Card>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"><Card className="glass-card min-w-0"><CardHeader className="border-b border-border/40 pb-4"><CardTitle className="font-heading text-xl">Quick Actions</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">{[{ label: 'Add New Blog', href: '/resources/blogs', icon: FileText }, { label: 'Upload Images', href: '/admin/gallery', icon: Upload }, { label: 'Create Event', href: '/admin/events', icon: CalendarDays }, { label: 'Add Publication', href: '/admin/gazette', icon: Newspaper }, { label: 'Manage Gallery', href: '/admin/gallery', icon: Images }, { label: 'Update Page', href: '/admin/settings', icon: FolderOpen }].map((item) => <Link href={item.href} key={item.label} className="flex min-h-24 min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-border/50 bg-background/70 p-3 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"><item.icon className="h-5 w-5 text-primary" /><span className="text-xs font-semibold">{item.label}</span></Link>)}</CardContent></Card><Card className="glass-card min-w-0"><CardHeader className="border-b border-border/40 pb-4"><CardTitle className="font-heading text-xl">Storage Usage</CardTitle></CardHeader><CardContent className="p-4"><div className="relative mx-auto h-40 w-40"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={storage} dataKey="value" innerRadius={50} outerRadius={68} paddingAngle={2} startAngle={90} endAngle={-270}><Cell fill="#7A0C0C" /><Cell fill="#D9D0C7" /></Pie><Tooltip /></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="font-heading text-2xl font-bold">65%</span><span className="text-[10px] text-muted-foreground">Used</span></div></div><div className="mt-3 space-y-2 text-xs"><div className="flex justify-between"><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7A0C0C]" />Used Space</span><strong>6.5 GB</strong></div><div className="flex justify-between"><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#D9D0C7]" />Free Space</span><strong>3.5 GB</strong></div></div></CardContent></Card></div>
      </div>
      <aside className="space-y-6"><Card className="overflow-hidden border-0 bg-[#4A0808] text-white shadow-lg"><CardContent className="p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4A0808]"><Plus className="h-6 w-6" /></span><div><h2 className="font-heading text-lg font-bold">Create New Content</h2><p className="text-xs text-white/70">Add pages, blogs, events, images and more.</p></div></div><div className="mt-4 grid grid-cols-2 gap-2"><Link href="/admin/events" className="rounded bg-white/10 px-2 py-2 text-center text-xs hover:bg-white/20">Event</Link><Link href="/admin/gazette" className="rounded bg-white/10 px-2 py-2 text-center text-xs hover:bg-white/20">Publication</Link></div></CardContent></Card><Card className="glass-card"><CardHeader className="border-b border-border/40 py-4"><CardTitle className="font-heading text-lg">Website Structure</CardTitle></CardHeader><CardContent className="max-h-[620px] overflow-y-auto p-4">{tree.map((node) => <TreeNode key={node.label} node={node} />)}</CardContent></Card></aside>
    </div>
  </div>;
}
