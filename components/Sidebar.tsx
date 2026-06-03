'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Menu, Settings, X, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} />, href: '/' },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={20} />, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className={cn('relative hidden md:block', isOpen ? 'w-64' : 'w-20')}>
      {/* Desktop Sidebar */}
      <motion.nav
        className={cn(
          'hidden md:flex flex-col h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex-shrink-0',
          'border-r border-slate-800 transition-all duration-300',
          isOpen ? 'w-64' : 'w-20'
        )}
        initial={false}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          {isOpen && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Learn
            </motion.h1>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className="block">
              <motion.div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative cursor-pointer',
                  isActive(item.href)
                    ? 'text-white bg-slate-800/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/20'
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative z-10">{item.icon}</div>

                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-slate-900 border-t border-slate-800 z-40">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className="flex-1">
              <motion.div
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative cursor-pointer',
                  isActive(item.href) ? 'text-blue-400' : 'text-slate-400'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}