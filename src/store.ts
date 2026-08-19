import { create } from 'zustand';
import {
  BRANDS,
  CARRIERS,
  CATEGORIES,
  SUPPLIERS,
  UNITS,
  WAREHOUSES,
  genDamaged,
  genProducts,
  genReturns,
  genStockIn,
  genStockOut,
  genTransfers,
  genUsers,
} from './data/fixtures';
import type {
  DamagedGood,
  FormData,
  ModalType,
  Product,
  ReturnItem,
  Settings,
  StockIn,
  StockOut,
  Transfer,
  User,
  WarehouseId,
} from './types';

const EMPTY_FORM: FormData = {
  name: '',
  sku: '',
  category: CATEGORIES[0],
  brand: BRANDS[0],
  unit: UNITS[0],
  minStock: 20,
  supplier: SUPPLIERS[0],
  warehouseId: WAREHOUSES[0].id,
  items: 50,
  expectedDate: '2026-08-25',
  customer: '',
  carrier: CARRIERS[0],
  fromWarehouseId: WAREHOUSES[0].id,
  toWarehouseId: WAREHOUSES[1].id,
  notes: '',
  returnTypeIsCustomer: true,
  returnTypeIsSupplier: false,
  item: '',
  qty: 1,
  reason: '',
};

interface WmsState {
  warehouseId: WarehouseId | 'all';
  products: Product[];
  stockIn: StockIn[];
  stockOut: StockOut[];
  transfers: Transfer[];
  returns: ReturnItem[];
  damaged: DamagedGood[];
  users: User[];
  settings: Settings;
  activeModal: ModalType;
  formData: FormData;
  toast: string | null;

  selectWarehouse: (id: WarehouseId | 'all') => void;
  showToast: (msg: string) => void;

  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
  setForm: (key: keyof FormData, value: FormData[keyof FormData]) => void;
  submitModal: () => void;

  advance: (listKey: 'stockIn' | 'stockOut' | 'transfers', id: string, flow: string[]) => void;
  reject: (id: string) => void;
  toggleQuarantine: (id: string) => void;

  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const useWmsStore = create<WmsState>((set, get) => ({
  warehouseId: 'all',
  products: genProducts(),
  stockIn: genStockIn(),
  stockOut: genStockOut(),
  transfers: genTransfers(),
  returns: genReturns(),
  damaged: genDamaged(),
  users: genUsers(),
  settings: {
    orgName: 'Waypoint Logistics Inc.',
    timezone: 'America/Chicago',
    currency: 'USD',
    defaultWarehouse: WAREHOUSES[0].id,
    lowStockPct: 20,
    notifyLowStock: true,
    notifyDailyReport: true,
    notifyTransferApproval: false,
    sessionTimeout: '30 minutes',
  },
  activeModal: null,
  formData: { ...EMPTY_FORM },
  toast: null,

  selectWarehouse: (id) => set({ warehouseId: id }),

  showToast: (msg) => {
    set({ toast: msg });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ toast: null }), 2600);
  },

  openModal: (type) => {
    const f = { ...EMPTY_FORM };
    if (type === 'product') f.sku = 'SKU-' + (20000 + Math.floor(Math.random() * 9999));
    set({ activeModal: type, formData: f });
  },
  closeModal: () => set({ activeModal: null }),
  setForm: (key, value) => set((s) => ({ formData: { ...s.formData, [key]: value } })),

  submitModal: () => {
    const { formData: f, activeModal: type, showToast } = get();
    if (type === 'product') {
      const cost = 5 + Math.random() * 100;
      const p: Product = {
        id: 'p' + Date.now(),
        sku: (f.sku as string) || 'SKU-' + Date.now(),
        name: (f.name as string) || 'New Product',
        category: f.category,
        brand: f.brand,
        unit: f.unit,
        barcode: '8' + Math.floor(100000000000 + Math.random() * 800000000000),
        qr: 'QR-' + (f.sku || Date.now()),
        currentStock: 0,
        minStock: Number(f.minStock) || 10,
        unitCost: cost,
        warehouseId: WAREHOUSES[0].id,
        bin: 'Z1-R1-S1-B1',
        status: 'Low',
      };
      set((s) => ({ products: [p, ...s.products], activeModal: null }));
      showToast('Product added: ' + p.name);
    } else if (type === 'receipt') {
      const r: StockIn = {
        id: 'si' + Date.now(),
        ref: 'GR-2026-' + Math.floor(Math.random() * 9000 + 1000),
        supplier: f.supplier,
        warehouseId: f.warehouseId,
        items: Number(f.items) || 1,
        expectedDate: f.expectedDate,
        status: 'Pending',
      };
      set((s) => ({ stockIn: [r, ...s.stockIn], activeModal: null }));
      showToast('Receipt ' + r.ref + ' created');
    } else if (type === 'dispatch') {
      const r: StockOut = {
        id: 'so' + Date.now(),
        ref: 'DO-2026-' + Math.floor(Math.random() * 9000 + 1000),
        customer: (f.customer as string) || 'Unnamed Customer',
        warehouseId: f.warehouseId,
        carrier: f.carrier,
        items: Number(f.items) || 1,
        status: 'Pending',
      };
      set((s) => ({ stockOut: [r, ...s.stockOut], activeModal: null }));
      showToast('Dispatch ' + r.ref + ' created');
    } else if (type === 'transfer') {
      const r: Transfer = {
        id: 'tr' + Date.now(),
        ref: 'TR-2026-' + Math.floor(Math.random() * 9000 + 1000),
        fromId: f.fromWarehouseId,
        toId: f.toWarehouseId,
        items: Number(f.items) || 1,
        requestedBy: 'Alex Reyes',
        status: 'Pending Approval',
      };
      set((s) => ({ transfers: [r, ...s.transfers], activeModal: null }));
      showToast('Transfer ' + r.ref + ' submitted for approval');
    } else if (type === 'return') {
      const r: ReturnItem = {
        id: 'rt' + Date.now(),
        ref: 'RT-2026-' + Math.floor(Math.random() * 9000 + 1000),
        type: f.returnTypeIsCustomer ? 'Customer' : 'Supplier',
        item: (f.item as string) || 'Item',
        qty: Number(f.qty) || 1,
        reason: (f.reason as string) || 'Unspecified',
        status: 'Requested',
      };
      set((s) => ({ returns: [r, ...s.returns], activeModal: null }));
      showToast('Return ' + r.ref + ' logged');
    } else if (type === 'damage') {
      const r: DamagedGood = {
        id: 'dg' + Date.now(),
        ref: 'DM-2026-' + Math.floor(Math.random() * 9000 + 1000),
        item: (f.item as string) || 'Item',
        qty: Number(f.qty) || 1,
        warehouseId: f.warehouseId,
        reason: (f.reason as string) || 'Unspecified',
        quarantined: false,
        status: 'Reported',
      };
      set((s) => ({ damaged: [r, ...s.damaged], activeModal: null }));
      showToast('Damage report ' + r.ref + ' filed');
    }
  },

  advance: (listKey, id, flow) => {
    set((s) => ({
      [listKey]: (s[listKey] as { id: string; status: string }[]).map((r) => {
        if (r.id !== id) return r;
        const i = flow.indexOf(r.status);
        return { ...r, status: flow[Math.min(i + 1, flow.length - 1)] };
      }),
    }) as unknown as Partial<WmsState>);
  },
  reject: (id) => {
    set((s) => ({
      transfers: s.transfers.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)),
    }));
  },
  toggleQuarantine: (id) => {
    set((s) => ({
      damaged: s.damaged.map((r) =>
        r.id === id
          ? { ...r, quarantined: !r.quarantined, status: !r.quarantined ? 'Quarantined' : 'Under Review' }
          : r,
      ),
    }));
  },

  updateSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),
}));

export function paginate<T>(list: T[], page: number, size = 10) {
  const totalPages = Math.max(1, Math.ceil(list.length / size));
  const p = Math.min(page, totalPages);
  return { rows: list.slice((p - 1) * size, p * size), page: p, totalPages };
}
