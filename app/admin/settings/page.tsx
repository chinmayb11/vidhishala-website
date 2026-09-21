'use client';

import * as React from 'react';
import { CheckCircle2, LockKeyhole, Save, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/admin/auth-provider';

export default function AdminSettingsPage() {
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const [password, setPassword] = React.useState('');
  const [confirmation, setConfirmation] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 10) {
      toast({ title: 'Password too short', description: 'Use at least 10 characters.', variant: 'destructive' });
      return;
    }
    if (password !== confirmation) {
      toast({ title: 'Passwords do not match', description: 'Enter the same password in both fields.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const { error } = await updatePassword(password);
    setSaving(false);
    if (error) {
      toast({ title: 'Password update failed', description: error, variant: 'destructive' });
      return;
    }
    setPassword('');
    setConfirmation('');
    toast({ title: 'Password updated', description: 'Your administrator password was saved by the backend.' });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">Users & Settings</p>
        <h1 className="font-heading text-3xl font-bold">Website Settings</h1>
        <p className="text-sm text-muted-foreground">Manage administrator security and CMS preferences.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center gap-2 font-heading text-xl"><LockKeyhole className="h-5 w-5 text-primary" />Change Password</CardTitle></CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              <div><Label htmlFor="admin-new-password">New password</Label><Input id="admin-new-password" type="password" minLength={10} required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1" autoComplete="new-password" /></div>
              <div><Label htmlFor="admin-confirm-password">Confirm password</Label><Input id="admin-confirm-password" type="password" minLength={10} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-1" autoComplete="new-password" /></div>
              <Button type="submit" disabled={saving} className="w-full bg-[#7A0C0C] text-white hover:bg-[#4A0808]"><Save className="mr-2 h-4 w-4" />{saving ? 'Updating...' : 'Update Password'}</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center gap-2 font-heading text-xl"><Settings2 className="h-5 w-5 text-primary" />CMS Health</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span>Server session authentication is active.</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span>Admin content is managed through the backend API.</span></div>
            <p className="text-xs text-muted-foreground">Records are stored by the application backend and are available to authenticated administrators.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
