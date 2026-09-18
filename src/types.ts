export type CategoryId = 
  | 'print_dokumen'
  | 'cetak_foto'
  | 'nota'
  | 'laminating'
  | 'fotocopy'
  | 'cetak_undangan'
  | 'jilid_spiral'
  | 'cetak_stiker';

export interface PriceOption {
  id: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  recommendedPrinter?: 'Canon' | 'Epson' | 'Both';
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  options: PriceOption[];
}

export interface PriceCategory {
  id: CategoryId;
  menuNumber: number;
  title: string;
  iconName: string;
  badge?: string;
  subCategories: SubCategory[];
}

export interface PrinterPreset {
  id: string;
  title: string;
  targetProduct: string;
  paperType: string;
  printQuality: string;
  colorMode: string;
  paperSource: string;
  notes: string[];
  recommendedDpi?: string;
}

export interface PrinterMaintenanceGuide {
  title: string;
  summary: string;
  steps: string[];
}

export interface PrinterBrandInfo {
  brand: 'Canon' | 'Epson';
  fullName: string;
  recommendedModels: string[];
  primaryCharacteristics: string[];
  presets: PrinterPreset[];
  maintenanceGuides: PrinterMaintenanceGuide[];
  proTips: string[];
}

export type OrderStatus = 
  | 'menunggu_file'
  | 'antrian'
  | 'proses_cetak'
  | 'finishing'
  | 'siap_ambil'
  | 'selesai';

export interface OrderCartItem {
  id: string;
  categoryTitle: string;
  subCategoryTitle: string;
  optionName: string;
  price: number;
  unit: string;
  quantity: number;
  customNote?: string;
  printerTarget?: 'Canon' | 'Epson' | 'Both' | 'Umum';
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  dueDate?: string;
  items: OrderCartItem[];
  subtotal: number;
  discount: number;
  total: number;
  downPayment: number;
  status: OrderStatus;
  notes?: string;
  isPaid: boolean;
}

export interface ShopProfile {
  name: string;
  tagline: string;
  phone: string;
  address: string;
  socialMedia: string;
}
