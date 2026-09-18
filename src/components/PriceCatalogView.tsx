import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PriceCategory, PriceOption, SubCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { formatRupiah } from '../utils/format';

interface PriceCatalogViewProps {
  categories: PriceCategory[];
  onAddToCart: (
    categoryTitle: string,
    subCategoryTitle: string,
    option: PriceOption,
    quantity?: number
  ) => void;
  onEditOptionPrice: (
    categoryId: string,
    subCategoryId: string,
    optionId: string,
    currentPrice: number,
    optionName: string,
    unit: string
  ) => void;
  onOpenPrinterSettings: (brand?: 'Canon' | 'Epson') => void;
}

export const PriceCatalogView: React.FC<PriceCatalogViewProps> = ({
  categories,
  onAddToCart,
  onEditOptionPrice,
  onOpenPrinterSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [expandedSubCategories, setExpandedSubCategories] = useState<Record<string, boolean>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Toggle subcategory expansion
  const toggleSubCategory = (subCatId: string) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCatId]: prev[subCatId] !== undefined ? !prev[subCatId] : false, // Default is expanded
    }));
  };

  const isSubCategoryExpanded = (subCatId: string) => {
    return expandedSubCategories[subCatId] !== false; // default open
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        if (selectedCategoryId === 'all') return true;
        return cat.id === selectedCategoryId;
      })
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const q = searchQuery.toLowerCase();

        const filteredSub = cat.subCategories
          .map((sub) => {
            const filteredOptions = sub.options.filter(
              (opt) =>
                opt.name.toLowerCase().includes(q) ||
                (opt.description && opt.description.toLowerCase().includes(q)) ||
                sub.title.toLowerCase().includes(q) ||
                cat.title.toLowerCase().includes(q)
            );
            return {
              ...sub,
              options: filteredOptions,
            };
          })
          .filter(
            (sub) =>
              sub.title.toLowerCase().includes(q) || sub.options.length > 0
          );

        return {
          ...cat,
          subCategories: filteredSub,
        };
      })
      .filter((cat) => cat.subCategories.some((sub) => sub.options.length > 0));
  }, [categories, selectedCategoryId, searchQuery]);

  const handleAddWithFeedback = (
    catTitle: string,
    subCatTitle: string,
    option: PriceOption
  ) => {
    onAddToCart(catTitle, subCatTitle, option, 1);
    setAddedAnimationId(option.id);
    setTimeout(() => {
      setAddedAnimationId((current) => (current === option.id ? null : current));
    }, 1200);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-100 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>Menu A: Katalog Daftar Harga</span>
            <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-1.5 py-0.2 rounded">
              8 Kategori
            </span>
          </div>
          <p className="text-slate-500 mt-0.5 leading-relaxed">
            Klik tombol <span className="font-semibold text-sky-600">+ Pesan</span> untuk menambahkan ke keranjang kalkulator pesanan secara real-time.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="input-catalog-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari foto, polaroid, undangan, stiker, jilid..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 rounded-xl text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
          >
            Reset
          </button>
        )}
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="no-scrollbar overflow-x-auto -mx-4 px-4 flex items-center gap-1.5 pb-1">
        <button
          onClick={() => setSelectedCategoryId('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategoryId === 'all'
              ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
          }`}
        >
          Semua Menu ({categories.length})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
              }`}
            >
              <span>{cat.menuNumber}.</span>
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Layanan tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">
              Tidak ada harga cetak yang cocok dengan kata kunci "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
              }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-sky-600 bg-sky-50 rounded-lg hover:bg-sky-100"
            >
              Tampilkan Semua Harga
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden transition-all"
            >
              {/* Category Header */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/70 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-bold">
                    <CategoryIcon name={category.iconName} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100">
                        A.{category.menuNumber}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                        {category.title}
                      </h2>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {category.subCategories.length} Sub-Menu Layanan
                    </span>
                  </div>
                </div>

                {category.badge && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {category.badge}
                  </span>
                )}
              </div>

              {/* Sub Categories inside Category */}
              <div className="divide-y divide-slate-100">
                {category.subCategories.map((subCategory) => {
                  const isOpen = isSubCategoryExpanded(subCategory.id);
                  return (
                    <div key={subCategory.id} className="p-3">
                      {/* Sub Category Title Bar (Collapsible) */}
                      <button
                        onClick={() => toggleSubCategory(subCategory.id)}
                        className="w-full flex items-center justify-between py-1 text-left group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          <h3 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {subCategory.title}
                          </h3>
                          <span className="text-[10px] text-slate-400 font-medium">
                            ({subCategory.options.length} varian)
                          </span>
                        </div>
                        <div className="flex items-center text-slate-400 group-hover:text-slate-600">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {subCategory.description && isOpen && (
                        <p className="text-[11px] text-slate-500 pl-4 mb-2.5">
                          {subCategory.description}
                        </p>
                      )}

                      {/* Options Grid / Cards */}
                      {isOpen && (
                        <div className="space-y-2 mt-2">
                          {subCategory.options.map((option) => {
                            const isAdded = addedAnimationId === option.id;
                            return (
                              <div
                                key={option.id}
                                className={`rounded-xl border p-2.5 transition-all ${
                                  isAdded
                                    ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-200'
                                    : 'bg-slate-50/50 hover:bg-sky-50/30 border-slate-150 hover:border-sky-200'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <h4 className="text-xs font-bold text-slate-800 leading-snug">
                                        {option.name}
                                      </h4>
                                    </div>
                                    {option.description && (
                                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                                        {option.description}
                                      </p>
                                    )}

                                    {/* Price & Unit & Recommended Printer Tag */}
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-xs font-bold text-sky-600">
                                          {formatRupiah(option.price)}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                          / {option.unit}
                                        </span>
                                      </div>

                                      {/* Recommended Printer Badge that can open Printer Settings directly */}
                                      {option.recommendedPrinter && (
                                        <button
                                          onClick={() =>
                                            onOpenPrinterSettings(
                                              option.recommendedPrinter === 'Both'
                                                ? undefined
                                                : option.recommendedPrinter
                                            )
                                          }
                                          title={`Buka setting printer ${option.recommendedPrinter}`}
                                          className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold border transition-colors ${
                                            option.recommendedPrinter === 'Canon'
                                              ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                              : option.recommendedPrinter === 'Epson'
                                              ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                          }`}
                                        >
                                          <span>Opt: {option.recommendedPrinter}</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Action Buttons: Edit Price & Add to Order */}
                                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                                    <button
                                      onClick={() =>
                                        onEditOptionPrice(
                                          category.id,
                                          subCategory.id,
                                          option.id,
                                          option.price,
                                          option.name,
                                          option.unit
                                        )
                                      }
                                      title="Ubah tarif harga item ini"
                                      className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      id={`btn-add-${option.id}`}
                                      onClick={() =>
                                        handleAddWithFeedback(
                                          category.title,
                                          subCategory.title,
                                          option
                                        )
                                      }
                                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                                        isAdded
                                          ? 'bg-emerald-500 text-white'
                                          : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-100 active:scale-95'
                                      }`}
                                    >
                                      {isAdded ? (
                                        <>
                                          <Check className="w-3.5 h-3.5" />
                                          <span>Masuk</span>
                                        </>
                                      ) : (
                                        <>
                                          <Plus className="w-3.5 h-3.5" />
                                          <span>Pesan</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Footer Shortcut to Setting Printer */}
      <div className="pt-2 text-center">
        <button
          onClick={() => onOpenPrinterSettings()}
          className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-semibold hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-full border border-sky-200 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Buka Menu B: Setting Print Canon & Epson</span>
        </button>
      </div>
    </div>
  );
};
