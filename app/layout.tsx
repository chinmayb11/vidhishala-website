import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { ConditionalChrome } from '@/components/conditional-chrome';
import { LoadingScreen } from '@/components/loading-screen';
import { ServiceWorkerRegister } from '@/components/sw-register';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Vidhishala | Empowering Legal Minds Since 2020',
  description:
    'A registered socio-legal organization under The Rajasthan Societies Registration Act, 1958. Driving legal education, research, and societal transformation through the Library Internship Program, Rajasthan Law Festival, and The Vidhi Gazette.',
  manifest: '/manifest.json',
  keywords: [
    'Vidhishala',
    'legal education',
    'Rajasthan Law Festival',
    'Library Internship Program',
    'Vidhi Gazette',
    'legal research',
    'Jaipur',
    'socio-legal organization',
  ],
  authors: [{ name: 'Vidhishala' }],
  openGraph: {
    title: 'Vidhishala | Empowering Legal Minds Since 2020',
    description:
      'A registered socio-legal organization driving legal education, research, and societal transformation.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidhishala',
    description: 'Empowering Legal Minds. Driving Societal Transformation.',
  },
  metadataBase: new URL('https://www.vidhishala.org'),
  icons: {
    icon: '/vidhishala%20circle%20logo.png',
    apple: '/vidhishala%20circle%20logo.png',
  },
  themeColor: '#7A0C0C',
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
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="vidhishala-theme-v2"
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
