export type WarehouseId = string;

export interface Warehouse {
  id: WarehouseId;
  name: string;
  code: string;
  city: string;
  util: number;
}

export type ProductStatus = 'OK' | 'Watch' | 'Low';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  unit: string;
  barcode: string;
  qr: string;
  currentStock: number;
  minStock: number;
  unitCost: number;
  warehouseId: WarehouseId;
  bin: string;
  status: ProductStatus;
}

export type StockInStatus = 'Pending' | 'Receiving' | 'Completed';

export interface StockIn {
  id: string;
  ref: string;
  supplier: string;
  warehouseId: WarehouseId;
  items: number;
  expectedDate: string;
  status: StockInStatus;
}

export type StockOutStatus = 'Pending' | 'Picking' | 'Dispatched' | 'Delivered';

export interface StockOut {
  id: string;
  ref: string;
  customer: string;
  warehouseId: WarehouseId;
  carrier: string;
  items: number;
  status: StockOutStatus;
}

export type TransferStatus = 'Pending Approval' | 'Approved' | 'In Transit' | 'Completed' | 'Rejected';

export interface Transfer {
  id: string;
  ref: string;
  fromId: WarehouseId;
  toId: WarehouseId;
  items: number;
  requestedBy: string;
  status: TransferStatus;
}

export type ReturnStatus = 'Requested' | 'Inspecting' | 'Restocked' | 'Rejected';

export interface ReturnItem {
  id: string;
  ref: string;
  type: 'Customer' | 'Supplier';
  item: string;
  qty: number;
  reason: string;
  status: ReturnStatus;
}

export type DamagedStatus = 'Quarantined' | 'Under Review' | 'Reported';

export interface DamagedGood {
  id: string;
  ref: string;
  item: string;
  qty: number;
  warehouseId: WarehouseId;
  reason: string;
  quarantined: boolean;
  status: DamagedStatus;
}

export type Role = 'Admin' | 'Manager' | 'Warehouse Staff' | 'Stock Controller' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  warehouseId: WarehouseId | 'all';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface PermissionRow {
  module: string;
  admin: string;
  manager: string;
  staff: string;
  controller: string;
  viewer: string;
}

export interface Settings {
  orgName: string;
  timezone: string;
  currency: string;
  defaultWarehouse: WarehouseId;
  lowStockPct: number;
  notifyLowStock: boolean;
  notifyDailyReport: boolean;
  notifyTransferApproval: boolean;
  sessionTimeout: string;
}

export type ModalType = 'product' | 'receipt' | 'dispatch' | 'transfer' | 'return' | 'damage' | null;

export interface FormData {
  name: string;
  sku: string;
  category: string;
  brand: string;
  unit: string;
  minStock: number | string;
  supplier: string;
  warehouseId: WarehouseId;
  items: number | string;
  expectedDate: string;
  customer: string;
  carrier: string;
  fromWarehouseId: WarehouseId;
  toWarehouseId: WarehouseId;
  notes: string;
  returnTypeIsCustomer: boolean;
  returnTypeIsSupplier: boolean;
  item: string;
  qty: number | string;
  reason: string;
}
