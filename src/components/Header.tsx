import React from 'react';
import { Printer, ShoppingBag, Settings, Store, Sparkles } from 'lucide-react';
import { ShopProfile } from '../types';

interface HeaderProps {
  shop: ShopProfile;
  cartCount: number;
  activeOrdersCount: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  shop,
  cartCount,
  activeOrdersCount,
  onOpenCart,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-[0_2px_10px_-3px_rgba(14,165,233,0.08)]">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Shop Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-sky-200">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">
                {shop.name}
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[190px]">
              Daftar Harga & Manajemen Cetak
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {/* Active Orders Quick Counter */}
          {activeOrdersCount > 0 && (
            <div 
              title={`${activeOrdersCount} pesanan aktif diproses`}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>{activeOrdersCount} Antre</span>
            </div>
          )}

          {/* Cart button */}
          <button
            id="btn-header-cart"
            onClick={onOpenCart}
            aria-label="Keranjang pesanan cetak"
            className="relative p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Settings button */}
          <button
            id="btn-header-settings"
            onClick={onOpenSettings}
            aria-label="Pengaturan Toko & Harga"
            className="p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
