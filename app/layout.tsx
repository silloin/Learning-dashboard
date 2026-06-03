import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import MainLayout from '@/components/MainLayout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LearnHub - Student Learning Dashboard',
  description:
    'A high-fidelity learning dashboard with animated Bento grid layout, real-time course tracking, and contribution graphs. Built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion.',
  keywords: ['learning', 'dashboard', 'education', 'courses', 'next.js', 'supabase'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="h-full bg-slate-950">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}