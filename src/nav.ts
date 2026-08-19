export interface NavItem {
  path: string;
  label: string;
  icon:
    | 'dashboard'
    | 'box'
    | 'qrcode'
    | 'building'
    | 'arrowDown'
    | 'arrowUp'
    | 'shuffle'
    | 'undo'
    | 'alert'
    | 'chart'
    | 'users'
    | 'settings'
    | 'layers';
  title: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'dashboard', title: 'Dashboard' },
  { path: '/inventory', label: 'Inventory', icon: 'box', title: 'Inventory' },
  { path: '/products', label: 'Products', icon: 'qrcode', title: 'Products' },
  { path: '/warehouses', label: 'Warehouses', icon: 'building', title: 'Warehouses' },
  { path: '/stock-in', label: 'Stock In', icon: 'arrowDown', title: 'Stock In' },
  { path: '/stock-out', label: 'Stock Out', icon: 'arrowUp', title: 'Stock Out' },
  { path: '/transfers', label: 'Transfers', icon: 'shuffle', title: 'Warehouse Transfers' },
  { path: '/returns', label: 'Returns', icon: 'undo', title: 'Returns' },
  { path: '/damaged-goods', label: 'Damaged Goods', icon: 'alert', title: 'Damaged Goods' },
  { path: '/reports', label: 'Reports', icon: 'chart', title: 'Reports' },
  { path: '/users', label: 'Users & Roles', icon: 'users', title: 'Users & Roles' },
  { path: '/settings', label: 'Settings', icon: 'settings', title: 'Settings' },
  { path: '/mobile', label: 'Mobile App', icon: 'layers', title: 'Mobile App' },
];
