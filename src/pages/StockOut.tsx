import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { statusTagClass, whName } from '../data/fixtures';
import { useWmsStore } from '../store';

const FLOW = ['Pending', 'Picking', 'Dispatched', 'Delivered'];
const NEXT_LABELS = ['Pick', 'Dispatch', 'Deliver'];

export function StockOut() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const stockOut = useWmsStore((s) => s.stockOut);
  const openModal = useWmsStore((s) => s.openModal);
  const advance = useWmsStore((s) => s.advance);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const rows = stockOut.filter((r) => inWh(r.warehouseId));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => openModal('dispatch')}>
          <Icon name="plus" size={14} /> New Dispatch
        </button>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>Customer</th>
              <th>Warehouse</th>
              <th>Carrier</th>
              <th>Items</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const idx = FLOW.indexOf(r.status);
              const showAdvance = idx >= 0 && idx < FLOW.length - 1;
              const nextLabel = NEXT_LABELS[idx] ?? 'Advance';
              return (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{r.ref}</td>
                  <td>{r.customer}</td>
                  <td style={{ opacity: 0.75 }}>{whName(r.warehouseId)}</td>
                  <td style={{ opacity: 0.75 }}>{r.carrier}</td>
                  <td>{r.items} units</td>
                  <td>
                    <span className={statusTagClass(r.status)}>{r.status}</span>
                  </td>
                  <td>
                    {showAdvance && (
                      <button className="btn btn-secondary" onClick={() => advance('stockOut', r.id, FLOW)}>
                        {nextLabel}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
