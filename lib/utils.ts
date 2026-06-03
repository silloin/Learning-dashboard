import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LUCIDE_ICONS = {
  BookOpen: 'BookOpen',
  Code: 'Code',
  Palette: 'Palette',
  Brain: 'Brain',
  Zap: 'Zap',
  Rocket: 'Rocket',
  Database: 'Database',
  GitBranch: 'GitBranch',
} as const;

export function getRandomGradient(index: number): string {
  const gradients = [
    'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    'from-purple-500/20 via-pink-500/20 to-red-500/20',
    'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    'from-orange-500/20 via-red-500/20 to-pink-500/20',
    'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
  ];
  return gradients[index % gradients.length];
}
