import React, { useState } from 'react';
import { Settings, Store, Phone, MapPin, Share2, RotateCcw, X, Check } from 'lucide-react';
import { ShopProfile } from '../types';

interface ShopSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: ShopProfile;
  onSaveShop: (updatedShop: ShopProfile) => void;
  onResetDefaultPrices: () => void;
}

export const ShopSettingsModal: React.FC<ShopSettingsModalProps> = ({
  isOpen,
  onClose,
  shop,
  onSaveShop,
  onResetDefaultPrices,
}) => {
  const [name, setName] = useState(shop.name);
  const [tagline, setTagline] = useState(shop.tagline);
  const [phone, setPhone] = useState(shop.phone);
  const [address, setAddress] = useState(shop.address);
  const [socialMedia, setSocialMedia] = useState(shop.socialMedia);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveShop({
      name: name.trim() || 'Percetakan Express',
      tagline: tagline.trim(),
      phone: phone.trim(),
      address: address.trim(),
      socialMedia: socialMedia.trim(),
    });
    onClose();
  };

  const handleReset = () => {
    if (confirm('Kembalikan semua daftar harga dan menu ke tarif standar awal?')) {
      onResetDefaultPrices();
      alert('Daftar harga telah di-reset ke standar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold text-slate-800">
              Pengaturan Toko Percetakan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Nama Usaha Percetakan
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Slogan / Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Nomor WhatsApp Toko
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08123456789"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Alamat Toko (Dicetak di Struk)
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Media Sosial / Catatan Kaki
            </label>
            <input
              type="text"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
              placeholder="@cetak_express"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-slate-800"
            />
          </div>

          {/* Reset Prices Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tarif Harga ke Awal Pabrik</span>
            </button>
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
              <span>Simpan Profil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
