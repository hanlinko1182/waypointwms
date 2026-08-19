import { useState } from 'react';
import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { CATEGORIES, WAREHOUSES, whCode } from '../data/fixtures';
import { useWmsStore } from '../store';

const REPORT_TYPES = [
  { id: 'daily-stock', label: 'Daily Stock Report', desc: 'Snapshot of stock by warehouse' },
  { id: 'monthly-inventory', label: 'Monthly Inventory Report', desc: 'Units in stock by category' },
  { id: 'low-stock', label: 'Low Stock Alert', desc: 'SKUs below minimum level' },
  { id: 'valuation', label: 'Stock Valuation Report', desc: 'Inventory value by category' },
  { id: 'performance', label: 'Warehouse Performance Report', desc: 'Utilization, accuracy, speed' },
  { id: 'movement', label: 'Product Movement Report', desc: 'Recent stock in / out activity' },
] as const;

type ReportId = (typeof REPORT_TYPES)[number]['id'];

export function Reports() {
  const products = useWmsStore((s) => s.products);
  const stockIn = useWmsStore((s) => s.stockIn);
  const stockOut = useWmsStore((s) => s.stockOut);
  const [selectedReport, setSelectedReport] = useState<ReportId>('daily-stock');

  const warehouseCards = WAREHOUSES.map((w) => {
    const prods = products.filter((p) => p.warehouseId === w.id);
    return { ...w, skuCount: prods.length, units: prods.reduce((a, p) => a + p.currentStock, 0) };
  });

  const catUnits: Record<string, number> = {};
  const catValue: Record<string, number> = {};
  CATEGORIES.forEach((c) => {
    catUnits[c] = 0;
    catValue[c] = 0;
  });
  products.forEach((p) => {
    catUnits[p.category] += p.currentStock;
    catValue[p.category] += p.currentStock * p.unitCost;
  });
  const maxCat = Math.max(1, ...Object.values(catUnits));
  const categoryBreakdown = CATEGORIES.map((c) => ({
    name: c,
    units: catUnits[c],
    pct: Math.round((catUnits[c] / maxCat) * 100),
    value: catValue[c].toFixed(0),
  }));

  const lowStockList = products.filter((p) => p.status === 'Low');
  const performanceRows = WAREHOUSES.map((w, i) => ({
    name: w.name,
    util: w.util,
    accuracy: 96 + (i * 2) % 4,
    dispatchTime: (3 + i * 0.4).toFixed(1) + 'h',
  }));
  const movementRows = [
    ...stockIn.slice(0, 4).map((r) => ({ ref: r.ref, type: 'Receipt', warehouseName: whCode(r.warehouseId), items: r.items, status: r.status })),
    ...stockOut.slice(0, 4).map((r) => ({ ref: r.ref, type: 'Dispatch', warehouseName: whCode(r.warehouseId), items: r.items, status: r.status })),
  ];

  const activeReport = REPORT_TYPES.find((r) => r.id === selectedReport)!;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {REPORT_TYPES.map((r) => (
          <div
            key={r.id}
            className="blueprint"
            onClick={() => setSelectedReport(r.id)}
            style={{ padding: 16, cursor: 'pointer', background: selectedReport === r.id ? 'var(--color-accent-100)' : 'transparent' }}
          >
            <Corners />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-accent)', marginBottom: 6 }}>
              <Icon name="chart" size={18} />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600 }}>{r.label}</div>
            <div style={{ fontSize: 11.5, opacity: 0.6, marginTop: 3 }}>{r.desc}</div>
          </div>
        ))}
      </div>

      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>{activeReport.label}</div>

        {selectedReport === 'daily-stock' && (
          <table className="table">
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>SKUs</th>
                <th>Units on Hand</th>
                <th>Utilization</th>
              </tr>
            </thead>
            <tbody>
              {warehouseCards.map((w) => (
                <tr key={w.id}>
                  <td>{w.name}</td>
                  <td>{w.skuCount}</td>
                  <td>{w.units}</td>
                  <td>{w.util}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedReport === 'monthly-inventory' && (
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Units in Stock</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {categoryBreakdown.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.units}</td>
                  <td>{c.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedReport === 'low-stock' && (
          <table className="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Warehouse</th>
                <th>Stock</th>
                <th>Min</th>
              </tr>
            </thead>
            <tbody>
              {lowStockList.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{p.sku}</td>
                  <td>{p.name}</td>
                  <td style={{ opacity: 0.75 }}>{whCode(p.warehouseId)}</td>
                  <td>{p.currentStock}</td>
                  <td style={{ opacity: 0.6 }}>{p.minStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedReport === 'valuation' && (
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Units</th>
                <th>Est. Value</th>
              </tr>
            </thead>
            <tbody>
              {categoryBreakdown.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.units}</td>
                  <td>${c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedReport === 'performance' && (
          <table className="table">
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>Utilization</th>
                <th>Pick Accuracy</th>
                <th>Avg. Dispatch Time</th>
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((w) => (
                <tr key={w.name}>
                  <td>{w.name}</td>
                  <td>{w.util}%</td>
                  <td>{w.accuracy}%</td>
                  <td>{w.dispatchTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedReport === 'movement' && (
          <table className="table">
            <thead>
              <tr>
                <th>Ref #</th>
                <th>Type</th>
                <th>Warehouse</th>
                <th>Items</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {movementRows.map((m) => (
                <tr key={m.ref}>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{m.ref}</td>
                  <td>
                    <span className="tag tag-neutral">{m.type}</span>
                  </td>
                  <td style={{ opacity: 0.75 }}>{m.warehouseName}</td>
                  <td>{m.items}</td>
                  <td>{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
