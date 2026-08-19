import { useState } from 'react';
import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { WAREHOUSES } from '../data/fixtures';
import { useWmsStore } from '../store';

export function Warehouses() {
  const products = useWmsStore((s) => s.products);
  const [explorerWarehouseId, setExplorerWarehouseId] = useState<string | null>(null);
  const [explorerZone, setExplorerZone] = useState<number | null>(null);
  const [explorerRack, setExplorerRack] = useState<number | null>(null);
  const [explorerShelf, setExplorerShelf] = useState<number | null>(null);

  const warehouseCards = WAREHOUSES.map((w) => {
    const prods = products.filter((p) => p.warehouseId === w.id);
    return { ...w, skuCount: prods.length, units: prods.reduce((a, p) => a + p.currentStock, 0) };
  });

  const explore = (whId: string) => {
    setExplorerWarehouseId(whId);
    setExplorerZone(null);
    setExplorerRack(null);
    setExplorerShelf(null);
  };

  const ew = explorerWarehouseId;
  const whObj = ew ? WAREHOUSES.find((w) => w.id === ew) : null;

  type Crumb = { label: string; weight: number; hasNext: boolean; onClick: () => void };
  const breadcrumbs: Crumb[] = [];
  if (whObj) {
    breadcrumbs.push({
      label: whObj.name,
      weight: !explorerZone ? 600 : 400,
      hasNext: true,
      onClick: () => {
        setExplorerZone(null);
        setExplorerRack(null);
        setExplorerShelf(null);
      },
    });
    if (explorerZone) {
      breadcrumbs.push({
        label: 'Zone ' + explorerZone,
        weight: !explorerRack ? 600 : 400,
        hasNext: true,
        onClick: () => {
          setExplorerRack(null);
          setExplorerShelf(null);
        },
      });
    }
    if (explorerRack) {
      breadcrumbs.push({
        label: 'Rack ' + explorerRack,
        weight: !explorerShelf ? 600 : 400,
        hasNext: true,
        onClick: () => setExplorerShelf(null),
      });
    }
    if (explorerShelf) {
      breadcrumbs.push({ label: 'Shelf ' + explorerShelf, weight: 600, hasNext: false, onClick: () => {} });
    }
    breadcrumbs[breadcrumbs.length - 1].hasNext = false;
  }

  type ExplorerItem = { key: number; label: string; sub: string; cursor: string; bg: string; onClick: () => void };
  let explorerItems: ExplorerItem[] = [];
  if (ew) {
    if (!explorerZone) {
      explorerItems = [1, 2, 3].map((z) => {
        const cnt = products.filter((p) => p.warehouseId === ew && p.bin.indexOf('Z' + z + '-') === 0).length;
        return { key: z, label: 'Zone ' + z, sub: cnt + ' SKUs', cursor: 'pointer', bg: 'transparent', onClick: () => setExplorerZone(z) };
      });
    } else if (!explorerRack) {
      explorerItems = [1, 2, 3, 4, 5, 6].map((r) => ({
        key: r,
        label: 'Rack ' + r,
        sub: '4 shelves',
        cursor: 'pointer',
        bg: 'transparent',
        onClick: () => setExplorerRack(r),
      }));
    } else if (!explorerShelf) {
      explorerItems = [1, 2, 3, 4].map((sh) => ({
        key: sh,
        label: 'Shelf ' + sh,
        sub: '8 bins',
        cursor: 'pointer',
        bg: 'transparent',
        onClick: () => setExplorerShelf(sh),
      }));
    } else {
      explorerItems = [1, 2, 3, 4, 5, 6, 7, 8].map((b) => {
        const key = 'Z' + explorerZone + '-R' + explorerRack + '-S' + explorerShelf + '-B' + b;
        const prod = products.find((p) => p.warehouseId === ew && p.bin === key);
        return {
          key: b,
          label: 'Bin ' + b,
          sub: prod ? prod.sku : 'Empty',
          cursor: 'default',
          bg: prod ? 'var(--color-accent-100)' : 'transparent',
          onClick: () => {},
        };
      });
    }
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        {warehouseCards.map((w) => (
          <div className="blueprint" key={w.id} style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Corners />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-accent)' }}>
                <Icon name="building" size={18} />
              </span>
              <span className="tag tag-neutral">{w.code}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600 }}>{w.name}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{w.city}</div>
            <div style={{ height: 6, background: 'var(--color-neutral-200)' }}>
              <div style={{ height: 6, background: 'var(--color-accent)', width: w.util + '%' }} />
            </div>
            <div style={{ fontSize: 11.5, opacity: 0.6 }}>
              {w.util}% utilized · {w.skuCount} SKUs
            </div>
            <button className="btn btn-secondary btn-block" onClick={() => explore(w.id)}>
              View Structure
            </button>
          </div>
        ))}
      </div>

      {ew && (
        <div className="blueprint" style={{ padding: 20 }}>
          <Corners />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 16, flexWrap: 'wrap' }}>
            {breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <a onClick={b.onClick} style={{ cursor: 'pointer', fontWeight: b.weight }}>
                  {b.label}
                </a>
                {b.hasNext && (
                  <span style={{ opacity: 0.4 }}>
                    <Icon name="chevronRight" size={12} />
                  </span>
                )}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
            {explorerItems.map((it) => (
              <div
                key={it.key}
                onClick={it.onClick}
                className="blueprint"
                style={{ padding: 12, cursor: it.cursor, background: it.bg }}
              >
                <Corners />
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13.5, fontWeight: 600 }}>{it.label}</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3 }}>{it.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
