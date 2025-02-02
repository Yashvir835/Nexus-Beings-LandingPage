// app/(landingPage)/layout.tsx
'use client';
import { Navbar } from '@/components/NavBar';
import { Poppins } from 'next/font/google';
import PageTransitionLayout from '@/components/PageTransitionLayout';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className}`}>
      <Navbar />
      <PageTransitionLayout>
        <main className="relative h-screen">{children}</main>
      </PageTransitionLayout>
    </div>
  );
}