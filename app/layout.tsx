import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ConditionalChrome } from '@/components/conditional-chrome';
import { LoadingScreen } from '@/components/loading-screen';
import { ServiceWorkerRegister } from '@/components/sw-register';
import { Toaster } from '@/components/ui/toaster';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vidhishala Foundation | Empowering Legal Minds Since 2020',
  description:
    'A registered socio-legal organization under The Rajasthan Societies Registration Act, 1958. Driving legal education, research, and societal transformation through the Library Internship Program, Rajasthan Law Festival, and The Vidhi Gazette.',
  manifest: '/manifest.json',
  keywords: [
    'Vidhishala Foundation',
    'legal education',
    'Rajasthan Law Festival',
    'Library Internship Program',
    'Vidhi Gazette',
    'legal research',
    'Jaipur',
    'socio-legal organization',
  ],
  authors: [{ name: 'Vidhishala Foundation' }],
  openGraph: {
    title: 'Vidhishala Foundation | Empowering Legal Minds Since 2020',
    description:
      'A registered socio-legal organization driving legal education, research, and societal transformation.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidhishala Foundation',
    description: 'Empowering Legal Minds. Driving Societal Transformation.',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  themeColor: '#080C14',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${playfair.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <ConditionalChrome>
            {children}
          </ConditionalChrome>
          <ServiceWorkerRegister />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
