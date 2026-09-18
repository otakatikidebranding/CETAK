import { OrderStatus } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export function getStatusLabel(status: OrderStatus): { label: string; bg: string; text: string; border: string } {
  switch (status) {
    case 'menunggu_file':
      return {
        label: 'Menunggu File',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200'
      };
    case 'antrian':
      return {
        label: 'Antrian Cetak',
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200'
      };
    case 'proses_cetak':
      return {
        label: 'Sedang Dicetak',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200'
      };
    case 'finishing':
      return {
        label: 'Finishing / Jilid',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200'
      };
    case 'siap_ambil':
      return {
        label: 'Siap Diambil',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
      };
    case 'selesai':
      return {
        label: 'Selesai',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200'
      };
    default:
      return {
        label: 'Status',
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200'
      };
  }
}

export function generateWhatsAppReceipt(
  shopName: string,
  orderNumber: string,
  customerName: string,
  items: Array<{ optionName: string; quantity: number; unit: string; price: number }>,
  subtotal: number,
  discount: number,
  total: number,
  downPayment: number,
  status: OrderStatus,
  notes?: string
): string {
  const itemLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.optionName}*\n   Qty: ${item.quantity} ${item.unit} x ${formatRupiah(item.price)} = *${formatRupiah(item.quantity * item.price)}*`
    )
    .join('\n');

  const sisa = Math.max(0, total - downPayment);
  const statusInfo = getStatusLabel(status).label;

  const text = `*NOTA PESANAN CETAK - ${shopName}*
----------------------------------------
No. Order: *${orderNumber}*
Pelanggan: *${customerName}*
Status: *[ ${statusInfo.toUpperCase()} ]*
Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' })}

*RINCIAN CETAK:*
${itemLines}
----------------------------------------
Subtotal: ${formatRupiah(subtotal)}
${discount > 0 ? `Diskon: -${formatRupiah(discount)}\n` : ''}Total Biaya: *${formatRupiah(total)}*
Uang Muka (DP): ${formatRupiah(downPayment)}
*Sisa Tagihan: ${sisa === 0 ? 'LUNAS (Rp 0)' : formatRupiah(sisa)}*
${notes ? `\nCatatan Khusus: _${notes}_\n` : ''}
Terima kasih telah mempercayakan cetakan Anda kepada kami!`;

  return encodeURIComponent(text);
}
