import React from 'react';
import { Printer, Share2, X, CheckCircle2 } from 'lucide-react';
import { CustomerOrder, ShopProfile } from '../types';
import { formatRupiah, getStatusLabel, generateWhatsAppReceipt } from '../utils/format';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: CustomerOrder | null;
  shop: ShopProfile;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  order,
  shop,
}) => {
  if (!isOpen || !order) return null;

  const statusInfo = getStatusLabel(order.status);
  const remaining = Math.max(0, order.total - order.downPayment);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const cleanPhone = order.customerPhone ? order.customerPhone.replace(/\D/g, '') : '';
    const formattedPhone = cleanPhone
      ? cleanPhone.startsWith('0')
        ? `62${cleanPhone.slice(1)}`
        : cleanPhone.startsWith('62')
        ? cleanPhone
        : `62${cleanPhone}`
      : '';

    const waText = generateWhatsAppReceipt(
      shop.name,
      order.orderNumber,
      order.customerName,
      order.items,
      order.subtotal,
      order.discount,
      order.total,
      order.downPayment,
      order.status,
      order.notes
    );

    const waUrl = formattedPhone
      ? `https://wa.me/${formattedPhone}?text=${waText}`
      : `https://wa.me/?text=${waText}`;

    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Modal */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 print:hidden">
          <span className="text-xs font-bold text-slate-800">Nota Pesanan Digital</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Style Card */}
        <div id="printable-receipt" className="p-5 overflow-y-auto space-y-4 font-mono text-xs text-slate-800">
          {/* Shop Header */}
          <div className="text-center space-y-1">
            <h2 className="text-base font-extrabold uppercase tracking-tight text-slate-900 font-sans">
              {shop.name}
            </h2>
            <p className="text-[11px] text-slate-500">{shop.tagline}</p>
            <p className="text-[10px] text-slate-400">{shop.address}</p>
            {shop.phone && (
              <p className="text-[10px] text-slate-500">WA: {shop.phone}</p>
            )}
          </div>

          <div className="border-t border-dashed border-slate-300 my-2" />

          {/* Metadata */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">No. Order:</span>
              <span className="font-bold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tanggal:</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pelanggan:</span>
              <span className="font-bold">{order.customerName}</span>
            </div>
            {order.customerPhone && (
              <div className="flex justify-between">
                <span className="text-slate-500">Telepon:</span>
                <span>{order.customerPhone}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold uppercase text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                {statusInfo.label}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 my-2" />

          {/* Items Table */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Daftar Pesanan:
            </span>
            {order.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5 text-[11px]">
                <div className="font-bold text-slate-900">{item.optionName}</div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    {item.quantity} {item.unit} x {formatRupiah(item.price)}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {formatRupiah(item.quantity * item.price)}
                  </span>
                </div>
                {item.customNote && (
                  <div className="text-[10px] text-slate-400 italic">
                    * {item.customNote}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-300 my-2" />

          {/* Financial Summary */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>{formatRupiah(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Diskon:</span>
                <span>-{formatRupiah(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200 text-xs">
              <span>TOTAL BIAYA:</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Uang Muka (DP):</span>
              <span>{formatRupiah(order.downPayment)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-slate-900 pt-1 border-t border-slate-300">
              <span>SISA PEMBAYARAN:</span>
              <span className={remaining === 0 ? 'text-emerald-600' : 'text-amber-700'}>
                {remaining === 0 ? 'LUNAS (Rp 0)' : formatRupiah(remaining)}
              </span>
            </div>
          </div>

          {order.notes && (
            <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600">
              <span className="font-bold block mb-0.5">Catatan:</span>
              <span>{order.notes}</span>
            </div>
          )}

          {/* Footer Note */}
          <div className="text-center pt-2 space-y-1 text-[10px] text-slate-400">
            <p>Simpan nota ini sebagai bukti pengambilan cetakan.</p>
            <p className="font-semibold text-slate-500">
              Terima Kasih Atas Kepercayaan Anda!
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2 print:hidden">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Kirim WA</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Nota</span>
          </button>
        </div>
      </div>
    </div>
  );
};
