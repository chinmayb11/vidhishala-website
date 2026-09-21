'use client';

import * as React from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const installedHandler = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: 'Install Vidhishala App',
        description:
          'Use your browser menu and select "Add to Home Screen" or "Install App" to install.',
      });
      return;
    }
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        toast({
          title: 'App Installed',
          description: 'Vidhishala app has been added to your device.',
        });
      }
    } finally {
      setDeferredPrompt(null);
    }
  };

  if (installed) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="inline-flex items-center gap-2 border-green-500/30 text-green-500"
        aria-label="Vidhishala app installed"
        title="Vidhishala app installed"
      >
        <Check className="h-4 w-4" />
        <span className="hidden sm:inline">Installed</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstall}
      className="inline-flex items-center gap-2 relative overflow-hidden group"
      aria-label="Install Vidhishala app"
      title="Install Vidhishala app"
    >
      <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
      <span className="hidden sm:inline">Install App</span>
    </Button>
  );
}
