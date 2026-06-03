'use client';

import * as LucideIcons from 'lucide-react';
import { memo } from 'react';

type LucideIconName = keyof typeof LucideIcons;

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const DynamicIcon = memo(function DynamicIcon({
  name,
  size = 24,
  className = '',
}: DynamicIconProps) {
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  const key = iconName as LucideIconName;

  const IconComponent = (LucideIcons as Record<LucideIconName, unknown>)[key];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  const Comp = IconComponent as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  return <Comp size={size} className={className} />;
});

export default DynamicIcon;

