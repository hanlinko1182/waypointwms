import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { CATEGORIES, WAREHOUSES } from '../data/fixtures';
import { useWmsStore } from '../store';

const MOVEMENT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MOVEMENT_IN = [62, 80, 45, 90, 70, 55, 40];
const MOVEMENT_OUT = [50, 65, 60, 75, 85, 40, 30];

const RECENT_ACTIVITY: { icon: Parameters<typeof Icon>[0]['name']; text: string; time: string }[] = [
  { icon: 'arrowDown', text: 'Receipt GR-2026-1042 completed at NDC-01', time: '12 minutes ago' },
  { icon: 'shuffle', text: 'Transfer TR-2026-3015 approved', time: '48 minutes ago' },
  { icon: 'arrowUp', text: 'Dispatch DO-2026-2044 delivered to Ridgeline Outfitters', time: '1 hour ago' },
  { icon: 'alert', text: 'Low stock alert: Cabin Air Filter at WCH-02', time: '2 hours ago' },
  { icon: 'undo', text: 'Customer return RT-2026-4009 inspected', time: '3 hours ago' },
  { icon: 'box', text: 'New product added: Fleece Zip Jacket', time: '5 hours ago' },
];

export function Dashboard() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const products = useWmsStore((s) => s.products);
  const stockIn = useWmsStore((s) => s.stockIn);
  const stockOut = useWmsStore((s) => s.stockOut);
  const transfers = useWmsStore((s) => s.transfers);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const whScopedProducts = products.filter((p) => inWh(p.warehouseId));

  const metricCards: { label: string; value: string | number; sub: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
    { label: 'Total Products', value: whScopedProducts.length, sub: 'active SKUs', icon: 'box' },
    {
      label: 'Total Inventory',
      value: whScopedProducts.reduce((a, p) => a + p.currentStock, 0).toLocaleString(),
      sub: 'units on hand',
      icon: 'layers',
    },
    {
      label: 'Low Stock Products',
      value: whScopedProducts.filter((p) => p.status === 'Low').length,
      sub: 'below minimum level',
      icon: 'alert',
    },
    {
      label: "Today's Receipts",
      value: stockIn.filter((r) => inWh(r.warehouseId) && r.status !== 'Completed').length,
      sub: 'in progress',
      icon: 'arrowDown',
    },
    {
      label: "Today's Dispatches",
      value: stockOut.filter((r) => inWh(r.warehouseId) && r.status !== 'Delivered').length,
      sub: 'in progress',
      icon: 'arrowUp',
    },
    {
      label: 'Warehouse Utilization',
      value:
        (warehouseId === 'all'
          ? Math.round(WAREHOUSES.reduce((a, w) => a + w.util, 0) / WAREHOUSES.length)
          : WAREHOUSES.find((w) => w.id === warehouseId)!.util) + '%',
      sub: 'of rated capacity',
      icon: 'building',
    },
    {
      label: 'Inventory Value',
      value: '$' + whScopedProducts.reduce((a, p) => a + p.currentStock * p.unitCost, 0).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      sub: 'estimated at cost',
      icon: 'chart',
    },
    {
      label: 'Recent Activities',
      value: stockIn.length + stockOut.length + transfers.length,
      sub: 'movements this month',
      icon: 'dashboard',
    },
  ];

  const warehouseCompare = WAREHOUSES.map((w) => ({ name: w.code, util: w.util }));

  const catTotals: Record<string, number> = {};
  CATEGORIES.forEach((c) => (catTotals[c] = 0));
  whScopedProducts.forEach((p) => (catTotals[p.category] += p.currentStock));
  const maxCat = Math.max(1, ...Object.values(catTotals));
  const categoryBreakdown = CATEGORIES.map((c) => ({ name: c, units: catTotals[c], pct: Math.round((catTotals[c] / maxCat) * 100) }));

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {metricCards.map((m) => (
          <div className="blueprint" key={m.label} style={{ padding: 16 }}>
            <Corners />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>{m.label}</div>
              <span style={{ color: 'var(--color-accent)' }}>
                <Icon name={m.icon} size={18} />
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 600, marginTop: 6 }}>{m.value}</div>
            <div style={{ fontSize: 11.5, opacity: 0.55, marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div className="blueprint" style={{ padding: 20 }}>
          <Corners />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>
            Stock Movement — Last 7 Days
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 150 }}>
            {MOVEMENT_DAYS.map((d, i) => (
              <div
                key={d}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}
              >
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 120 }}>
                  <div style={{ width: 9, background: 'var(--color-accent-300)', height: Math.round(MOVEMENT_IN[i] * 1.2) }} />
                  <div style={{ width: 9, background: 'var(--color-accent-700)', height: Math.round(MOVEMENT_OUT[i] * 1.2) }} />
                </div>
                <div style={{ fontSize: 10.5, opacity: 0.55 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, background: 'var(--color-accent-300)' }} />
              Receipts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, background: 'var(--color-accent-700)' }} />
              Dispatches
            </div>
          </div>
        </div>

        <div className="blueprint" style={{ padding: 20 }}>
          <Corners />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Warehouse Comparison</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {warehouseCompare.map((w) => (
              <div key={w.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                  <span>{w.name}</span>
                  <span style={{ opacity: 0.6 }}>{w.util}%</span>
                </div>
                <div style={{ height: 8, background: 'var(--color-neutral-200)', position: 'relative' }}>
                  <div style={{ height: 8, background: 'var(--color-accent)', width: w.util + '%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginTop: 16 }}>
        <div className="blueprint" style={{ padding: 20 }}>
          <Corners />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Inventory by Category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {categoryBreakdown.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 130, fontSize: 12, flex: 'none' }}>{c.name}</div>
                <div style={{ flex: 1, height: 14, background: 'var(--color-neutral-200)', position: 'relative' }}>
                  <div style={{ height: 14, background: 'var(--color-accent-500)', width: c.pct + '%' }} />
                </div>
                <div style={{ width: 48, textAlign: 'right', fontSize: 12, opacity: 0.65 }}>{c.units}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="blueprint" style={{ padding: 20 }}>
          <Corners />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.text} style={{ display: 'flex', gap: 10, fontSize: 12.5 }}>
                <span style={{ color: 'var(--color-accent)', flex: 'none', marginTop: 1 }}>
                  <Icon name={a.icon} size={14} />
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 500 }}>{a.text}</span>
                  <div style={{ opacity: 0.5, fontSize: 11 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
