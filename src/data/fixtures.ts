import type {
  DamagedGood,
  PermissionRow,
  Product,
  ProductStatus,
  ReturnItem,
  StockIn,
  StockOut,
  Transfer,
  User,
  Warehouse,
} from '../types';

export const CATEGORIES = [
  'Electronics',
  'Apparel',
  'Home & Garden',
  'Automotive Parts',
  'Industrial Supplies',
  'Food & Beverage',
  'Health & Beauty',
  'Office Supplies',
];

export const BRANDS = [
  'Nova',
  'Ferrotech',
  'Cascade',
  'Meridian',
  'Anchorpoint',
  'Vanta',
  'Ridgeline',
  'Solace',
  'Kestrel',
  'Pallium',
];

export const UNITS = ['EA', 'BOX', 'CASE', 'PALLET', 'KG', 'L'];

const PRODUCT_NAMES: Record<string, string[]> = {
  Electronics: [
    'Wireless Barcode Scanner',
    'USB-C Hub 7-Port',
    'Thermal Label Printer',
    'Handheld RFID Reader',
    'Tablet Mount Kit',
    'Bluetooth Speaker',
  ],
  Apparel: ['Hi-Vis Safety Vest', 'Cotton Work Gloves', 'Steel-Toe Boots', 'Fleece Zip Jacket', 'Moisture-Wick Tee'],
  'Home & Garden': ['Garden Hose 50ft', 'LED Shop Light', 'Storage Tote 27gal', 'Folding Utility Cart'],
  'Automotive Parts': ['Brake Pad Set', 'Oil Filter Cartridge', 'Wiper Blade 22in', 'Cabin Air Filter'],
  'Industrial Supplies': [
    'Steel Shelving Unit',
    'Pallet Wrap Roll',
    'Safety Cone 28in',
    'Heavy-Duty Zip Ties',
    'Corrugated Box 18x18x12',
  ],
  'Food & Beverage': ['Sparkling Water 12pk', 'Trail Mix Bulk Bag', 'Coffee Beans 5lb', 'Protein Bar Case'],
  'Health & Beauty': ['Hand Sanitizer 1L', 'Nitrile Gloves Box', 'First Aid Kit Standard'],
  'Office Supplies': ['Copy Paper Case', 'Ballpoint Pen 12pk', 'Shipping Label Roll'],
};

export const WAREHOUSES: Warehouse[] = [
  { id: 'wh1', name: 'North Distribution Center', code: 'NDC-01', city: 'Chicago, IL', util: 78 },
  { id: 'wh2', name: 'West Coast Hub', code: 'WCH-02', city: 'Reno, NV', util: 62 },
  { id: 'wh3', name: 'Southeast Fulfillment', code: 'SEF-03', city: 'Atlanta, GA', util: 91 },
  { id: 'wh4', name: 'Central Overflow', code: 'CTO-04', city: 'Dallas, TX', util: 45 },
];

export const SUPPLIERS = [
  'Atlas Freight Co',
  'Meridian Distributors',
  'Cascade Import Ltd',
  'Ferrotech Manufacturing',
  'Anchorpoint Wholesale',
  'Kestrel Logistics',
];

export const CUSTOMERS = [
  'Brightline Retail',
  'Union Hardware Co',
  'Solace Grocers',
  'Ridgeline Outfitters',
  'Pallium Pharmacies',
  'Vanta Electronics Corp',
  'Northgate Markets',
];

export const CARRIERS = ['FreightPro', 'SwiftHaul', 'Continental Cargo', 'Anchor Line', 'RapidShip'];

const STAFF = ['J. Alvarez', 'M. Chen', 'T. Okafor', 'S. Novak', 'R. Delgado', 'P. Singh'];

export function whName(id: string): string {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export function whCode(id: string): string {
  return WAREHOUSES.find((w) => w.id === id)?.code ?? id;
}

export function statusTagClass(status: string): string {
  const ok = ['OK', 'Completed', 'Approved', 'Active', 'Delivered', 'Restocked'];
  const watch = [
    'Watch',
    'Pending',
    'Requested',
    'Reported',
    'Pending Approval',
    'Receiving',
    'Picking',
    'In Transit',
    'Under Review',
  ];
  if (ok.indexOf(status) >= 0) return 'tag tag-accent';
  if (watch.indexOf(status) >= 0) return 'tag tag-neutral';
  return 'tag tag-outline';
}

export function genProducts(): Product[] {
  const out: Product[] = [];
  let idx = 0;
  CATEGORIES.forEach((cat) => {
    (PRODUCT_NAMES[cat] ?? []).forEach((nm) => {
      const reps = idx < 8 ? 2 : 1;
      for (let r = 0; r < reps; r++) {
        const brand = BRANDS[idx % BRANDS.length];
        const unit = UNITS[idx % UNITS.length];
        const wh = WAREHOUSES[idx % WAREHOUSES.length];
        const currentStock = 20 + (idx * 17) % 480;
        const minStock = 15 + (idx * 5) % 40;
        const status: ProductStatus =
          currentStock <= minStock ? 'Low' : currentStock <= Math.round(minStock * 1.3) ? 'Watch' : 'OK';
        out.push({
          id: 'p' + idx,
          sku: 'SKU-' + (10000 + idx * 7),
          name: r === 1 ? brand + ' ' + nm : nm,
          category: cat,
          brand,
          unit,
          barcode: '8' + String(100000000000 + idx * 97531).slice(0, 12),
          qr: 'QR-P' + (10000 + idx * 7),
          currentStock,
          minStock,
          unitCost: 5 + (idx * 3.7) % 120,
          warehouseId: wh.id,
          bin: 'Z' + (1 + (idx % 3)) + '-R' + (1 + Math.floor(idx / 2) % 6) + '-S' + (1 + (idx % 4)) + '-B' + (1 + (idx % 8)),
          status,
        });
        idx++;
      }
    });
  });
  return out;
}

export function genStockIn(): StockIn[] {
  const flow: StockIn['status'][] = ['Pending', 'Receiving', 'Completed'];
  const out: StockIn[] = [];
  for (let i = 0; i < 15; i++) {
    out.push({
      id: 'si' + i,
      ref: 'GR-2026-' + (1000 + i * 7),
      supplier: SUPPLIERS[i % SUPPLIERS.length],
      warehouseId: WAREHOUSES[i % 4].id,
      items: 20 + (i * 23) % 300,
      expectedDate: '2026-08-' + String(10 + (i % 18)).padStart(2, '0'),
      status: flow[i % 3],
    });
  }
  return out;
}

export function genStockOut(): StockOut[] {
  const flow: StockOut['status'][] = ['Pending', 'Picking', 'Dispatched', 'Delivered'];
  const out: StockOut[] = [];
  for (let i = 0; i < 15; i++) {
    out.push({
      id: 'so' + i,
      ref: 'DO-2026-' + (2000 + i * 11),
      customer: CUSTOMERS[i % CUSTOMERS.length],
      warehouseId: WAREHOUSES[(i + 1) % 4].id,
      carrier: CARRIERS[i % CARRIERS.length],
      items: 10 + (i * 17) % 180,
      status: flow[i % 4],
    });
  }
  return out;
}

export function genTransfers(): Transfer[] {
  const flow: Transfer['status'][] = ['Pending Approval', 'Approved', 'In Transit', 'Completed'];
  const out: Transfer[] = [];
  for (let i = 0; i < 12; i++) {
    const from = WAREHOUSES[i % 4];
    const to = WAREHOUSES[(i + 2) % 4];
    out.push({
      id: 'tr' + i,
      ref: 'TR-2026-' + (3000 + i * 5),
      fromId: from.id,
      toId: to.id,
      items: 15 + (i * 13) % 120,
      requestedBy: STAFF[i % STAFF.length],
      status: i % 5 === 4 ? 'Rejected' : flow[i % 4],
    });
  }
  return out;
}

export function genReturns(): ReturnItem[] {
  const flow: ReturnItem['status'][] = ['Requested', 'Inspecting', 'Restocked', 'Rejected'];
  const reasons = [
    'Wrong item shipped',
    'Customer changed mind',
    'Damaged on arrival',
    'Quality defect',
    'Excess supplier shipment',
  ];
  const items = ['Steel Shelving Unit', 'Cotton Work Gloves', 'Brake Pad Set', 'Hand Sanitizer 1L', 'Copy Paper Case'];
  const out: ReturnItem[] = [];
  for (let i = 0; i < 10; i++) {
    out.push({
      id: 'rt' + i,
      ref: 'RT-2026-' + (4000 + i * 3),
      type: i % 2 === 0 ? 'Customer' : 'Supplier',
      item: items[i % items.length],
      qty: 2 + (i * 3) % 20,
      reason: reasons[i % reasons.length],
      status: flow[i % 4],
    });
  }
  return out;
}

export function genDamaged(): DamagedGood[] {
  const reasons = ['Water damage', 'Crushed in transit', 'Expired', 'Manufacturing defect'];
  const items = ['LED Shop Light', 'Trail Mix Bulk Bag', 'Wiper Blade 22in', 'Nitrile Gloves Box', 'Corrugated Box 18x18x12'];
  const out: DamagedGood[] = [];
  for (let i = 0; i < 9; i++) {
    out.push({
      id: 'dg' + i,
      ref: 'DM-2026-' + (5000 + i * 4),
      item: items[i % items.length],
      qty: 1 + (i * 2) % 12,
      warehouseId: WAREHOUSES[i % 4].id,
      reason: reasons[i % reasons.length],
      quarantined: i % 3 === 0,
      status: i % 3 === 0 ? 'Quarantined' : i % 3 === 1 ? 'Under Review' : 'Reported',
    });
  }
  return out;
}

export function genUsers(): User[] {
  const roles: User['role'][] = ['Admin', 'Manager', 'Warehouse Staff', 'Stock Controller', 'Viewer'];
  const names = [
    'Alex Reyes',
    'Priya Nair',
    'Marcus Webb',
    'Elena Voss',
    'Devon Chase',
    'Sofia Marchetti',
    'Kai Thompson',
    'Rosa Delgado',
    'Liam Foster',
    'Amara Osei',
  ];
  const out: User[] = [];
  for (let i = 0; i < 10; i++) {
    out.push({
      id: 'u' + i,
      name: names[i],
      email: names[i].toLowerCase().replace(' ', '.') + '@waypointwms.com',
      role: roles[i % 5],
      warehouseId: i % 5 === 0 ? 'all' : WAREHOUSES[i % 4].id,
      status: i % 7 === 0 ? 'Inactive' : 'Active',
      lastLogin: i % 7 === 0 ? '14 days ago' : 1 + (i % 9) + ' hours ago',
    });
  }
  return out;
}

export const PERMISSIONS: PermissionRow[] = [
  { module: 'Dashboard', admin: 'Full Access', manager: 'View Only', staff: 'View Only', controller: 'View Only', viewer: 'View Only' },
  { module: 'Inventory', admin: 'Full Access', manager: 'Edit', staff: 'View Only', controller: 'Edit', viewer: 'View Only' },
  { module: 'Products', admin: 'Full Access', manager: 'Edit', staff: 'View Only', controller: 'Edit', viewer: 'View Only' },
  { module: 'Warehouses', admin: 'Full Access', manager: 'Edit', staff: 'View Only', controller: 'View Only', viewer: 'View Only' },
  { module: 'Stock In', admin: 'Full Access', manager: 'Edit', staff: 'Edit', controller: 'Edit', viewer: 'No Access' },
  { module: 'Stock Out', admin: 'Full Access', manager: 'Edit', staff: 'Edit', controller: 'Edit', viewer: 'No Access' },
  { module: 'Transfers', admin: 'Full Access', manager: 'Full Access', staff: 'View Only', controller: 'Edit', viewer: 'No Access' },
  { module: 'Returns', admin: 'Full Access', manager: 'Edit', staff: 'Edit', controller: 'Edit', viewer: 'No Access' },
  { module: 'Damaged Goods', admin: 'Full Access', manager: 'Edit', staff: 'Edit', controller: 'Edit', viewer: 'No Access' },
  { module: 'Reports', admin: 'Full Access', manager: 'View Only', staff: 'No Access', controller: 'View Only', viewer: 'No Access' },
  { module: 'Users & Roles', admin: 'Full Access', manager: 'View Only', staff: 'No Access', controller: 'No Access', viewer: 'No Access' },
  { module: 'Settings', admin: 'Full Access', manager: 'View Only', staff: 'No Access', controller: 'No Access', viewer: 'No Access' },
];
