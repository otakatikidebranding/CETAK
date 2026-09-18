import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  User, 
  FileText, 
  Share2, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Calculator,
  Send
} from 'lucide-react';
import { CustomerOrder, OrderCartItem, OrderStatus, ShopProfile } from '../types';
import { formatRupiah, generateWhatsAppReceipt } from '../utils/format';

interface OrderCalculatorViewProps {
  shop: ShopProfile;
  cart: OrderCartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddCustomItem: (item: OrderCartItem) => void;
  onCreateOrder: (order: CustomerOrder) => void;
  onSwitchToCatalog: () => void;
}

export const OrderCalculatorView: React.FC<OrderCalculatorViewProps> = ({
  shop,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddCustomItem,
  onCreateOrder,
  onSwitchToCatalog,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(0);
  const [isFullPayment, setIsFullPayment] = useState(true);
  const [status, setStatus] = useState<OrderStatus>('antrian');
  const [customItemModalOpen, setCustomItemModalOpen] = useState(false);

  // Custom Item Form State
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState<number>(5000);
  const [customUnit, setCustomUnit] = useState('lembar');
  const [customQty, setCustomQty] = useState<number>(1);
  const [customNote, setCustomNote] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);
  const finalDownPayment = isFullPayment ? total : Math.min(downPaymentAmount, total);
  const remainingBill = Math.max(0, total - finalDownPayment);

  const handleSaveOrder = () => {
    if (!customerName.trim()) {
      alert('Mohon masukkan nama pelanggan.');
      return;
    }

    if (cart.length === 0) {
      alert('Keranjang pesanan masih kosong.');
      return;
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}`;

    const newOrder: CustomerOrder = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      createdAt: formattedDate,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      total,
      downPayment: finalDownPayment,
      status,
      notes: orderNotes.trim(),
      isPaid: remainingBill === 0,
    };

    onCreateOrder(newOrder);

    // Optionally trigger WhatsApp message if customer has phone
    if (customerPhone.trim()) {
      const cleanPhone = customerPhone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('0')
        ? `62${cleanPhone.slice(1)}`
        : cleanPhone.startsWith('62')
        ? cleanPhone
        : `62${cleanPhone}`;

      const waText = generateWhatsAppReceipt(
        shop.name,
        orderNumber,
        customerName,
        cart,
        subtotal,
        discountAmount,
        total,
        finalDownPayment,
        status,
        orderNotes
      );

      const waUrl = `https://wa.me/${formattedPhone}?text=${waText}`;
      window.open(waUrl, '_blank');
    }

    // Reset Form
    setCustomerName('');
    setCustomerPhone('');
    setOrderNotes('');
    setDiscountAmount(0);
    setDownPaymentAmount(0);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newItem: OrderCartItem = {
      id: `custom-${Date.now()}`,
      categoryTitle: 'CUSTOM',
      subCategoryTitle: 'Item Khusus',
      optionName: customName.trim(),
      price: customPrice,
      unit: customUnit.trim() || 'pcs',
      quantity: customQty > 0 ? customQty : 1,
      customNote: customNote.trim() || undefined,
      printerTarget: 'Umum',
    };

    onAddCustomItem(newItem);
    setCustomItemModalOpen(false);
    setCustomName('');
    setCustomPrice(5000);
    setCustomUnit('lembar');
    setCustomQty(1);
    setCustomNote('');
  };

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-100 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
          <Calculator className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>Kasir & Kalkulator Pesanan</span>
            <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-1.5 py-0.2 rounded">
              Real-Time
            </span>
          </div>
          <p className="text-slate-500 mt-0.5 leading-relaxed">
            Hitung biaya cetak, tentukan uang muka (DP), dan kirimkan nota ke WhatsApp pelanggan.
          </p>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-sky-500" />
            <h2 className="text-xs font-bold text-slate-800">
              Rincian Item Cetak ({cart.length})
            </h2>
          </div>
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-[11px] text-red-500 hover:text-red-700 font-medium"
            >
              Kosongkan
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-6 text-center">
            <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">Keranjang masih kosong</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pilih item dari Daftar Harga (Menu A) atau tambahkan item kustom
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={onSwitchToCatalog}
                className="px-3 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-sm shadow-sky-200 hover:bg-sky-600"
              >
                Pilih dari Daftar Harga
              </button>
              <button
                onClick={() => setCustomItemModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                + Item Kustom
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cart.map((item) => {
              const lineTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-start justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-tight block">
                      {item.categoryTitle} • {item.subCategoryTitle}
                    </span>
                    <h3 className="text-xs font-bold text-slate-800 truncate">
                      {item.optionName}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {formatRupiah(item.price)} / {item.unit}
                    </div>
                    {item.customNote && (
                      <p className="text-[10px] text-slate-400 italic mt-0.5">
                        Catatan: {item.customNote}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs font-bold text-slate-900">
                      {formatRupiah(lineTotal)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 min-w-[22px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Button to add custom item */}
            <button
              onClick={() => setCustomItemModalOpen(true)}
              className="w-full py-2 border border-dashed border-sky-300 bg-sky-50/50 hover:bg-sky-50 rounded-xl text-xs font-semibold text-sky-700 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Item Khusus / Biaya Desain / Finishing</span>
            </button>
          </div>
        )}
      </div>

      {/* Customer Info Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <User className="w-4 h-4 text-sky-500" />
          <span>Informasi Pelanggan & Pesanan</span>
        </h2>

        <div className="space-y-2.5 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Nama Pelanggan / Instansi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Pak Andi / Kak Rina"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              No. WhatsApp (Untuk Kirim Nota)
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="08123456789"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Status Awal Pesanan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-xs text-slate-800"
            >
              <option value="antrian">Antrian Cetak</option>
              <option value="proses_cetak">Sedang Dicetak</option>
              <option value="finishing">Finishing / Jilid</option>
              <option value="siap_ambil">Siap Diambil</option>
              <option value="selesai">Selesai (Langsung Jadi)</option>
              <option value="menunggu_file">Menunggu File dari Customer</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Catatan Pengerjaan (Opsional)
            </label>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Contoh: Kertas Buffalo Biru, potong rapi, diambil jam 16.00"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-400 rounded-xl text-xs text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Payment & Calculation Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
          Rincian Pembayaran
        </h2>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal ({cart.length} item)</span>
            <span className="font-bold text-slate-800">{formatRupiah(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Potongan / Diskon</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[11px]">Rp</span>
              <input
                type="number"
                min="0"
                value={discountAmount || ''}
                onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                placeholder="0"
                className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-semibold text-slate-800 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
            <span className="font-bold text-slate-800">Total Akhir:</span>
            <span className="text-base font-extrabold text-sky-600">
              {formatRupiah(total)}
            </span>
          </div>

          {/* Payment Type Switch (Lunas vs DP) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-700">
                Metode Pembayaran:
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setIsFullPayment(true)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    isFullPayment
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lunas
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullPayment(false)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    !isFullPayment
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Uang Muka (DP)
                </button>
              </div>
            </div>

            {!isFullPayment && (
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-800">
                    Jumlah DP Diterima:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-700 text-xs">Rp</span>
                    <input
                      type="number"
                      min="0"
                      max={total}
                      value={downPaymentAmount || ''}
                      onChange={(e) => setDownPaymentAmount(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="w-28 px-2 py-1 bg-white border border-amber-300 rounded-lg text-right font-bold text-amber-900 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs font-bold text-amber-900 pt-1 border-t border-amber-200/60">
                  <span>Sisa Pelunasan Saat Ambil:</span>
                  <span>{formatRupiah(remainingBill)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit & WhatsApp Buttons */}
        <div className="pt-2 space-y-2">
          <button
            id="btn-save-order"
            onClick={handleSaveOrder}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
              cart.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-sky-200 active:scale-[0.98]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan Pesanan & Kelola Real-Time</span>
          </button>

          {customerPhone && (
            <p className="text-[10px] text-center text-slate-400">
              *Nota rincian otomatis siap dibagikan ke WhatsApp {customerPhone}
            </p>
          )}
        </div>
      </div>

      {/* Modal Add Custom Item */}
      {customItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800">
                Tambah Item / Biaya Kustom
              </h3>
              <button
                onClick={() => setCustomItemModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleAddCustom} className="space-y-2.5 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Nama Item / Layanan
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Misal: Biaya Desain / Jilid Hardcover Khusus"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Harga Satuan (Rp)
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Satuan
                  </label>
                  <input
                    type="text"
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    placeholder="lembar / pcs / buku"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Jumlah (Qty)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={customQty}
                    onChange={(e) => setCustomQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Catatan Bahan
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Opsional"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCustomItemModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-500 font-semibold hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-sm"
                >
                  Tambahkan ke Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
