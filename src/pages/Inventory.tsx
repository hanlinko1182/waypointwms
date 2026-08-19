import { useState } from 'react';
import { Corners } from '../components/Corners';
import { CATEGORIES, statusTagClass, whCode } from '../data/fixtures';
import { paginate, useWmsStore } from '../store';

export function Inventory() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const products = useWmsStore((s) => s.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const filtered = products
    .filter((p) => inWh(p.warehouseId))
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => search === '' || (p.name + p.sku).toLowerCase().includes(search.toLowerCase()));

  const { rows, page: curPage, totalPages } = paginate(filtered, page);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <input
          className="input"
          style={{ width: 240 }}
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="input"
          style={{ width: 190 }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, opacity: 0.6 }}>{filtered.length} items</div>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Bin</th>
              <th>Stock</th>
              <th>Min</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'var(--font-heading)', fontSize: 13 }}>{p.sku}</td>
                <td>{p.name}</td>
                <td style={{ opacity: 0.75 }}>{p.category}</td>
                <td style={{ opacity: 0.75 }}>{whCode(p.warehouseId)}</td>
                <td style={{ opacity: 0.75, fontFamily: 'var(--font-heading)' }}>{p.bin}</td>
                <td>{p.currentStock}</td>
                <td style={{ opacity: 0.6 }}>{p.minStock}</td>
                <td>
                  <span className={statusTagClass(p.status)}>{p.status}</span>
                </td>
                <td>${(p.currentStock * p.unitCost).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </button>
        <div style={{ fontSize: 12.5 }}>
          Page {curPage} of {totalPages}
        </div>
        <button className="btn btn-secondary" onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </>
  );
}
