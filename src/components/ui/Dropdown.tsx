import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface DropdownItem {
  path: string;
  label: string;
  icon: LucideIcon;
  category?: string;
  color?: string;
}

interface DropdownProps {
  label: string;
  icon: LucideIcon;
  items: DropdownItem[];
}

export const Dropdown = ({ label, icon: Icon, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, DropdownItem[]>);

  const categories = Object.keys(groupedItems);

  // Category display names and colors
  const categoryInfo: Record<string, { name: string; bgColor: string }> = {
    'SE': { name: 'Sound Engineering', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    'Musician': { name: 'Musicisti', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    'Singers': { name: 'Cantanti', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-900 dark:text-white font-medium"
      >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[280px] z-50">
          {categories.map((category, categoryIndex) => (
            <div key={category}>
              {/* Category Header */}
              {categoryInfo[category] && (
                <div className={`px-3 py-2 ${categoryInfo[category].bgColor} border-b border-gray-200 dark:border-gray-700`}>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {categoryInfo[category].name}
                  </span>
                </div>
              )}
              
              {/* Category Items */}
              {groupedItems[category].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <item.icon className={`w-5 h-5 ${item.color || 'text-gray-600 dark:text-gray-400'}`} />
                  <span className="text-gray-900 dark:text-white text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Separator between categories */}
              {categoryIndex < categories.length - 1 && (
                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};