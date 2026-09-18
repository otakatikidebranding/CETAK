import React, { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { formatRupiah } from '../utils/format';

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  subCategoryId: string;
  optionId: string;
  optionName: string;
  currentPrice: number;
  currentUnit: string;
  onSave: (
    categoryId: string,
    subCategoryId: string,
    optionId: string,
    newPrice: number,
    newUnit: string
  ) => void;
}

export const EditPriceModal: React.FC<EditPriceModalProps> = ({
  isOpen,
  onClose,
  categoryId,
  subCategoryId,
  optionId,
  optionName,
  currentPrice,
  currentUnit,
  onSave,
}) => {
  const [price, setPrice] = useState<number>(currentPrice);
  const [unit, setUnit] = useState<string>(currentUnit);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price <= 0) {
      alert('Harga harus lebih besar dari 0');
      return;
    }
    onSave(categoryId, subCategoryId, optionId, price, unit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-100 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold text-slate-800">Ubah Tarif Harga</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-700 bg-sky-50 p-2 rounded-xl text-sky-900">
          {optionName}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Harga Satuan Baru (Rp)
            </label>
            <input
              type="number"
              min="100"
              step="50"
              required
              autoFocus
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-sm font-bold text-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Pratinjau: {formatRupiah(price)}
            </span>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Satuan Tarif
            </label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="lembar, foto, buku, paket, pcs..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-slate-500 font-semibold hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan Harga</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
