import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WAREHOUSES, whCode } from '../data/fixtures';
import { NAV_ITEMS } from '../nav';
import { useWmsStore } from '../store';
import { Icon } from './Icon';

export function Header() {
  const location = useLocation();
  const [whMenuOpen, setWhMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const selectWarehouse = useWmsStore((s) => s.selectWarehouse);

  const active = NAV_ITEMS.find((n) => (n.path === '/' ? location.pathname === '/' : location.pathname.startsWith(n.path)));
  const screenTitle = active?.title ?? 'Dashboard';

  const currentWarehouseLabel = warehouseId === 'all' ? 'All Warehouses' : whCode(warehouseId);

  return (
    <header className="nav" style={{ borderBottom: '1px solid var(--color-divider)', gap: 16 }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600 }}>{screenTitle}</div>

      <div style={{ position: 'relative' }}>
        <button className="btn btn-secondary" onClick={() => setWhMenuOpen((o) => !o)} style={{ gap: 8 }}>
          <span style={{ display: 'flex' }}>
            <Icon name="building" size={14} />
          </span>
          {currentWarehouseLabel}
          <span style={{ display: 'flex' }}>
            <Icon name="chevronDown" size={14} />
          </span>
        </button>
        {whMenuOpen && (
          <div
            className="card elev-md"
            style={{
              position: 'absolute',
              top: 44,
              left: 0,
              width: 260,
              background: 'var(--color-bg)',
              zIndex: 20,
              padding: 6,
              gap: 0,
            }}
          >
            <div
              onClick={() => {
                selectWarehouse('all');
                setWhMenuOpen(false);
              }}
              style={{ padding: '9px 10px', cursor: 'pointer', fontSize: 13.5, fontWeight: warehouseId === 'all' ? 600 : 400 }}
            >
              All Warehouses
            </div>
            {WAREHOUSES.map((w) => (
              <div
                key={w.id}
                onClick={() => {
                  selectWarehouse(w.id);
                  setWhMenuOpen(false);
                }}
                style={{
                  padding: '9px 10px',
                  cursor: 'pointer',
                  fontSize: 13.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: warehouseId === w.id ? 600 : 400,
                }}
              >
                <span>{w.name}</span>
                <span style={{ opacity: 0.5, fontSize: 11.5 }}>{w.code}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <div className="field" style={{ width: 260, margin: 0 }}>
        <input
          className="input"
          placeholder="Search SKU, ref #, product..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          style={{ fontSize: 13 }}
        />
      </div>
      <button className="btn-icon btn-secondary" style={{ border: '1px solid var(--color-divider)' }}>
        <Icon name="bell" size={16} />
      </button>
    </header>
  );
}
