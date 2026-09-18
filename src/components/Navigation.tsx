import React from 'react';
import { Tag, Sliders, Calculator, ClipboardList } from 'lucide-react';

export type TabType = 'catalog' | 'printer_settings' | 'order_calculator' | 'orders_list';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
  activeOrdersCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  activeOrdersCount,
}) => {
  const tabs = [
    {
      id: 'catalog' as TabType,
      label: 'Daftar Harga',
      sublabel: 'Menu A',
      icon: Tag,
    },
    {
      id: 'printer_settings' as TabType,
      label: 'Setting Print',
      sublabel: 'Menu B',
      icon: Sliders,
    },
    {
      id: 'order_calculator' as TabType,
      label: 'Kasir & Order',
      sublabel: 'Kalkulator',
      icon: Calculator,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: 'orders_list' as TabType,
      label: 'Pesanan',
      sublabel: 'Real-time',
      icon: ClipboardList,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-sky-100 shadow-[0_-4px_20px_-2px_rgba(14,165,233,0.08)]">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-sky-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Active subtle pill background indicator */}
              {isActive && (
                <span className="absolute inset-0 bg-sky-50 rounded-xl -z-10 transition-transform" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[11px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5 leading-none">
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
