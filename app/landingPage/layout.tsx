/* app/(landingPage)/layout.tsx - Landing page layout */
'use client';

import {Navbar} from '@/components/NavBar';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
 

  return (
    <div className={`${poppins.className} `}>
      <Navbar />
      <main >
        {children}
      </main>
    </div>
  );
}