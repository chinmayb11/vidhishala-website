'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] animate-glow-pulse" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl animate-glow-pulse" />
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white p-1 shadow-2xl ring-1 ring-[#B08D57]/60 animate-float">
            <img src="/vidhishala%20circle%20logo.png" alt="Vidhishala logo" className="h-full w-full rounded-full object-contain" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="font-heading font-bold text-2xl tracking-wider text-gradient-gold animate-fade-up">
            VIDHISHALA
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-fade-up" style={{ animationDelay: '0.2s' }} />
        </div>

        <div className="mt-8 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
