import React, { useState, useEffect } from 'react';
import { 
  Header, 
  Navigation, 
  TabType,
  PriceCatalogView, 
  PrinterSettingsView, 
  OrderCalculatorView, 
  OrdersListView, 
  EditPriceModal, 
  ShopSettingsModal, 
  ReceiptModal 
} from './components';
import { 
  initialPriceCategories, 
  initialOrders, 
  defaultShopProfile 
} from './data/initialData';
import { 
  PriceCategory, 
  PriceOption, 
  OrderCartItem, 
  CustomerOrder, 
  OrderStatus, 
  ShopProfile 
} from './types';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Persistence state
  const [categories, setCategories] = useState<PriceCategory[]>(() => {
    try {
      const saved = localStorage.getItem('printflow_prices_v1');
      return saved ? JSON.parse(saved) : initialPriceCategories;
    } catch {
      return initialPriceCategories;
    }
  });

  const [cart, setCart] = useState<OrderCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('printflow_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('printflow_orders_v1');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [shop, setShop] = useState<ShopProfile>(() => {
    try {
      const saved = localStorage.getItem('printflow_shop_v1');
      return saved ? JSON.parse(saved) : defaultShopProfile;
    } catch {
      return defaultShopProfile;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const [printerBrandTarget, setPrinterBrandTarget] = useState<'Canon' | 'Epson'>('Canon');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<CustomerOrder | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isShopSettingsOpen, setIsShopSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileFrameMode, setMobileFrameMode] = useState(true);

  // Edit price modal state
  const [editPriceModalData, setEditPriceModalData] = useState<{
    isOpen: boolean;
    categoryId: string;
    subCategoryId: string;
    optionId: string;
    optionName: string;
    currentPrice: number;
    currentUnit: string;
  }>({
    isOpen: false,
    categoryId: '',
    subCategoryId: '',
    optionId: '',
    optionName: '',
    currentPrice: 0,
    currentUnit: '',
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('printflow_prices_v1', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('printflow_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('printflow_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('printflow_shop_v1', JSON.stringify(shop));
  }, [shop]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2000);
  };

  // Add Item to Order Cart
  const handleAddToCart = (
    categoryTitle: string,
    subCategoryTitle: string,
    option: PriceOption,
    quantity = 1
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === option.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: OrderCartItem = {
          id: option.id,
          categoryTitle,
          subCategoryTitle,
          optionName: option.name,
          price: option.price,
          unit: option.unit,
          quantity,
          printerTarget: option.recommendedPrinter || 'Umum',
        };
        return [...prev, newItem];
      }
    });
    showToast(`"${option.name}" masuk ke pesanan`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    if (confirm('Kosongkan semua item dalam keranjang?')) {
      setCart([]);
      showToast('Keranjang pesanan dikosongkan');
    }
  };

  // Add Custom Item to Cart
  const handleAddCustomItem = (item: OrderCartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`"${item.optionName}" ditambahkan`);
  };

  // Create Order
  const handleCreateOrder = (newOrder: CustomerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    showToast(`Pesanan #${newOrder.orderNumber} berhasil dibuat!`);
    setActiveTab('orders_list');
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showToast('Status pesanan berhasil diperbarui');
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    showToast('Pesanan telah dihapus');
  };

  // View Receipt
  const handleViewReceipt = (order: CustomerOrder) => {
    setSelectedReceiptOrder(order);
    setIsReceiptOpen(true);
  };

  // Open Edit Option Price Modal
  const handleOpenEditOptionPrice = (
    categoryId: string,
    subCategoryId: string,
    optionId: string,
    currentPrice: number,
    optionName: string,
    unit: string
  ) => {
    setEditPriceModalData({
      isOpen: true,
      categoryId,
      subCategoryId,
      optionId,
      optionName,
      currentPrice,
      currentUnit: unit,
    });
  };

  // Save Edited Price
  const handleSaveOptionPrice = (
    categoryId: string,
    subCategoryId: string,
    optionId: string,
    newPrice: number,
    newUnit: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          subCategories: cat.subCategories.map((sub) => {
            if (sub.id !== subCategoryId) return sub;
            return {
              ...sub,
              options: sub.options.map((opt) => {
                if (opt.id !== optionId) return opt;
                return {
                  ...opt,
                  price: newPrice,
                  unit: newUnit,
                };
              }),
            };
          }),
        };
      })
    );
    showToast('Tarif harga berhasil diubah');
  };

  // Reset Default Prices
  const handleResetDefaultPrices = () => {
    setCategories(initialPriceCategories);
    showToast('Tarif harga dikembalikan ke standar');
  };

  // Open Printer Settings Tab with specific brand
  const handleOpenPrinterSettings = (brand?: 'Canon' | 'Epson') => {
    if (brand) {
      setPrinterBrandTarget(brand);
    }
    setActiveTab('printer_settings');
  };

  const activeOrdersCount = orders.filter((o) => o.status !== 'selesai').length;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-800 selection:bg-sky-100 selection:text-sky-900">
      {/* Desktop view switcher helper */}
      <div className="hidden md:flex items-center justify-between w-full max-w-md py-1.5 px-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Smartphone className="w-3.5 h-3.5 text-sky-500" />
          <span>Mode Tampilan Mobile Friendly</span>
        </span>
        <button
          onClick={() => setMobileFrameMode(!mobileFrameMode)}
          className="hover:text-sky-600 underline"
        >
          {mobileFrameMode ? 'Perlebar Layar' : 'Bingkai Ponsel'}
        </button>
      </div>

      {/* Main Container: Mobile Frame */}
      <div
        className={`w-full bg-white flex flex-col min-h-screen relative shadow-2xl transition-all ${
          mobileFrameMode ? 'max-w-md sm:my-2 sm:rounded-3xl sm:border sm:border-slate-200/80 sm:overflow-hidden' : 'max-w-3xl'
        }`}
      >
        {/* Sticky Header */}
        <Header
          shop={shop}
          cartCount={totalCartCount}
          activeOrdersCount={activeOrdersCount}
          onOpenCart={() => setActiveTab('order_calculator')}
          onOpenSettings={() => setIsShopSettingsOpen(true)}
        />

        {/* Dynamic Views based on active tab */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'catalog' && (
            <PriceCatalogView
              categories={categories}
              onAddToCart={handleAddToCart}
              onEditOptionPrice={handleOpenEditOptionPrice}
              onOpenPrinterSettings={handleOpenPrinterSettings}
            />
          )}

          {activeTab === 'printer_settings' && (
            <PrinterSettingsView initialBrand={printerBrandTarget} />
          )}

          {activeTab === 'order_calculator' && (
            <OrderCalculatorView
              shop={shop}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onAddCustomItem={handleAddCustomItem}
              onCreateOrder={handleCreateOrder}
              onSwitchToCatalog={() => setActiveTab('catalog')}
            />
          )}

          {activeTab === 'orders_list' && (
            <OrdersListView
              orders={orders}
              shop={shop}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onViewReceipt={handleViewReceipt}
              onNewOrder={() => setActiveTab('order_calculator')}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cartCount={totalCartCount}
          activeOrdersCount={activeOrdersCount}
        />

        {/* Toast Feedback Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-2 animate-fade-in pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditPriceModal
        isOpen={editPriceModalData.isOpen}
        onClose={() =>
          setEditPriceModalData((prev) => ({ ...prev, isOpen: false }))
        }
        categoryId={editPriceModalData.categoryId}
        subCategoryId={editPriceModalData.subCategoryId}
        optionId={editPriceModalData.optionId}
        optionName={editPriceModalData.optionName}
        currentPrice={editPriceModalData.currentPrice}
        currentUnit={editPriceModalData.currentUnit}
        onSave={handleSaveOptionPrice}
      />

      <ShopSettingsModal
        isOpen={isShopSettingsOpen}
        onClose={() => setIsShopSettingsOpen(false)}
        shop={shop}
        onSaveShop={(newShop) => {
          setShop(newShop);
          showToast('Profil toko berhasil diperbarui');
        }}
        onResetDefaultPrices={handleResetDefaultPrices}
      />

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        order={selectedReceiptOrder}
        shop={shop}
      />
    </div>
  );
}
