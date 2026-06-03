'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
          {children}
        </div>
      </main>
    </div>
  );
}