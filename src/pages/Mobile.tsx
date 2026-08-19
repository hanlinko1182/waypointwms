import { useState } from 'react';
import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';

const TABS = [
  { id: 'tasks', label: 'Tasks' },
  { id: 'scan', label: 'Scan Receiving' },
  { id: 'pick', label: 'Pick List' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const MOBILE_TASKS = [
  { title: 'Receive GR-2026-0114', tag: 'Stock In', sub: 'Atlas Freight Co · 48 units · Dock 3' },
  { title: 'Pick DO-2026-0231', tag: 'Stock Out', sub: 'Ridgeline Outfitters · 4 items · Zone B' },
  { title: 'Cycle count — Zone A', tag: 'Audit', sub: 'Rack 1-3 · due 4:00 PM' },
  { title: 'Transfer TR-2026-3015', tag: 'Transfer', sub: 'To WCH-02 · 60 units' },
  { title: 'Quarantine review', tag: 'Damaged', sub: '2 items flagged this shift' },
];

const MOBILE_PICK_ITEMS = [
  { name: 'Steel Shelving Unit', bin: 'Z2-R3-S1-B4', qty: 2, picked: true },
  { name: 'Cotton Work Gloves', bin: 'Z1-R2-S2-B6', qty: 12, picked: true },
  { name: 'Brake Pad Set', bin: 'Z3-R1-S4-B2', qty: 4, picked: false },
  { name: 'Hand Sanitizer 1L', bin: 'Z1-R4-S1-B8', qty: 6, picked: false },
];

export function Mobile() {
  const [tab, setTab] = useState<TabId>('tasks');

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
        {TABS.map((t) => (
          <button key={t.id} className={'btn ' + (tab === t.id ? 'btn-primary' : 'btn-secondary')} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ width: 340, border: '1px solid var(--color-divider)', borderRadius: 22, padding: 14, background: 'var(--color-surface)' }}>
        <div style={{ height: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 70, height: 5, background: 'var(--color-divider)', borderRadius: 3 }} />
        </div>
        <div
          style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-divider)',
            minHeight: 560,
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {tab === 'tasks' && (
            <>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600 }}>My Tasks</div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: -10 }}>North Distribution Center · Shift ends 6:00 PM</div>
              {MOBILE_TASKS.map((t) => (
                <div className="blueprint" key={t.title} style={{ padding: 12 }}>
                  <Corners />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: 13.5 }}>{t.title}</span>
                    <span className="tag tag-neutral">{t.tag}</span>
                  </div>
                  <div style={{ fontSize: 11.5, opacity: 0.6, marginTop: 4 }}>{t.sub}</div>
                </div>
              ))}
            </>
          )}

          {tab === 'scan' && (
            <>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600 }}>Scan to Receive</div>
              <div
                style={{
                  border: '1px dashed var(--color-divider)',
                  height: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: 'var(--color-accent)',
                }}
              >
                <Icon name="qrcode" size={56} />
                <div style={{ fontSize: 11.5, opacity: 0.65 }}>Align barcode within frame</div>
              </div>
              <div className="field">
                <label>PO / Ref #</label>
                <input className="input" defaultValue="GR-2026-0114" />
              </div>
              <div className="field">
                <label>Quantity Received</label>
                <input className="input" type="number" defaultValue={48} />
              </div>
              <button className="btn btn-primary btn-block">Confirm Receipt</button>
            </>
          )}

          {tab === 'pick' && (
            <>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600 }}>Pick List — DO-2026-0231</div>
              {MOBILE_PICK_ITEMS.map((i) => (
                <div
                  key={i.name}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--color-divider)', paddingBottom: 10 }}
                >
                  <input type="checkbox" defaultChecked={i.picked} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{i.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>
                      {i.bin} · Qty {i.qty}
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary btn-block">Mark Ready for Dispatch</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
