import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  Search, 
  Phone, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  AlertCircle,
  Eye,
  Trash2,
  Calendar
} from 'lucide-react';
import { CustomerOrder, OrderStatus, ShopProfile } from '../types';
import { formatRupiah, getStatusLabel, generateWhatsAppReceipt } from '../utils/format';

interface OrdersListViewProps {
  orders: CustomerOrder[];
  shop: ShopProfile;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onViewReceipt: (order: CustomerOrder) => void;
  onNewOrder: () => void;
}

export const OrdersListView: React.FC<OrdersListViewProps> = ({
  orders,
  shop,
  onUpdateOrderStatus,
  onDeleteOrder,
  onViewReceipt,
  onNewOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customerPhone && order.customerPhone.includes(searchQuery));

      if (statusFilter === 'all') return matchesQuery;
      if (statusFilter === 'active') {
        return matchesQuery && order.status !== 'selesai';
      }
      return matchesQuery && order.status === statusFilter;
    });
  }, [orders, searchQuery, statusFilter]);

  const statusNextMap: Record<OrderStatus, OrderStatus | null> = {
    menunggu_file: 'antrian',
    antrian: 'proses_cetak',
    proses_cetak: 'finishing',
    finishing: 'siap_ambil',
    siap_ambil: 'selesai',
    selesai: null,
  };

  const handleAdvanceStatus = (order: CustomerOrder) => {
    const next = statusNextMap[order.status];
    if (next) {
      onUpdateOrderStatus(order.id, next);
    }
  };

  const handleShareWhatsApp = (order: CustomerOrder) => {
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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-100 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
          <ClipboardList className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>Manajemen Pesanan Real-Time</span>
            <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-1.5 py-0.2 rounded">
              {orders.filter((o) => o.status !== 'selesai').length} Aktif
            </span>
          </div>
          <p className="text-slate-500 mt-0.5 leading-relaxed">
            Pantau status pengerjaan cetak, update status satu ketukan, dan kirim nota digital ke WhatsApp.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-orders-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pelanggan, no nota, no WA..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 rounded-xl text-xs text-slate-800"
          />
        </div>

        {/* Status Filter Horizontal Pills */}
        <div className="no-scrollbar overflow-x-auto -mx-4 px-4 flex items-center gap-1.5 pb-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'active'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Antrean Aktif ({orders.filter((o) => o.status !== 'selesai').length})
          </button>
          <button
            onClick={() => setStatusFilter('proses_cetak')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'proses_cetak'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Sedang Cetak ({orders.filter((o) => o.status === 'proses_cetak').length})
          </button>
          <button
            onClick={() => setStatusFilter('siap_ambil')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'siap_ambil'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Siap Diambil ({orders.filter((o) => o.status === 'siap_ambil').length})
          </button>
          <button
            onClick={() => setStatusFilter('selesai')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === 'selesai'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Selesai ({orders.filter((o) => o.status === 'selesai').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">Tidak ada pesanan ditemukan</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {searchQuery ? 'Coba ubah kata kunci pencarian' : 'Belum ada antrian pesanan cetak'}
            </p>
            <button
              onClick={onNewOrder}
              className="mt-3 px-3 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-sm hover:bg-sky-600"
            >
              + Buat Pesanan Baru
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = getStatusLabel(order.status);
            const nextStatus = statusNextMap[order.status];
            const remaining = Math.max(0, order.total - order.downPayment);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                {/* Order Card Header */}
                <div className="p-3.5 border-b border-slate-100 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mt-1">
                      {order.customerName}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {order.createdAt}
                      </span>
                      {order.customerPhone && (
                        <span className="flex items-center gap-0.5 text-sky-600">
                          <Phone className="w-3 h-3" />
                          {order.customerPhone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-sky-600 block">
                      {formatRupiah(order.total)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded inline-block mt-0.5 ${
                        remaining === 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {remaining === 0 ? 'LUNAS' : `Sisa ${formatRupiah(remaining)}`}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="p-3 bg-slate-50/40 text-xs space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Item: {order.items.map((i) => `${i.quantity}x ${i.optionName}`).join(', ')}
                  </div>
                  {order.notes && (
                    <p className="text-[10px] text-slate-400 italic">
                      Catatan: {order.notes}
                    </p>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 bg-white">
                  <div className="flex items-center gap-1">
                    {/* View Digital Receipt */}
                    <button
                      onClick={() => onViewReceipt(order)}
                      title="Lihat & Cetak Nota Struk"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 border border-slate-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp share */}
                    <button
                      onClick={() => handleShareWhatsApp(order)}
                      title="Kirim Nota via WhatsApp"
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete order */}
                    <button
                      onClick={() => {
                        if (confirm(`Hapus pesanan ${order.orderNumber}?`)) {
                          onDeleteOrder(order.id);
                        }
                      }}
                      title="Hapus pesanan"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Advance Status Button */}
                  {nextStatus ? (
                    <button
                      onClick={() => handleAdvanceStatus(order)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs transition-colors"
                    >
                      <span>Lanjut: {getStatusLabel(nextStatus).label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pesanan Selesai</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
