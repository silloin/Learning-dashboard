import * as LucideIcons from 'lucide-react';

type LucideIconName = keyof typeof LucideIcons;

const FALLBACK_ICON: LucideIconName = 'HelpCircle';

export function getIconComponent(iconName: string) {
  const key = (iconName.charAt(0).toUpperCase() + iconName.slice(1)) as LucideIconName;
  return (LucideIcons as Record<LucideIconName, unknown>)[key] ?? LucideIcons[FALLBACK_ICON];
}

