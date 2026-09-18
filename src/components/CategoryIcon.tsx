import React from 'react';
import { 
  FileText, 
  Image, 
  Receipt, 
  Layers, 
  Copy, 
  MailCheck, 
  BookOpen, 
  Sticker, 
  Printer, 
  Sparkles,
  LucideIcon
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const iconMap: Record<string, LucideIcon> = {
    FileText,
    Image,
    Receipt,
    Layers,
    Copy,
    MailCheck,
    BookOpen,
    Sticker,
    Printer,
    Sparkles,
  };

  const IconComponent = iconMap[name] || FileText;
  return <IconComponent className={className} />;
};
