import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { statusTagClass, whName } from '../data/fixtures';
import { useWmsStore } from '../store';

const FLOW = ['Pending', 'Receiving', 'Completed'];

export function StockIn() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const stockIn = useWmsStore((s) => s.stockIn);
  const openModal = useWmsStore((s) => s.openModal);
  const advance = useWmsStore((s) => s.advance);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const rows = stockIn.filter((r) => inWh(r.warehouseId));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => openModal('receipt')}>
          <Icon name="plus" size={14} /> New Receipt
        </button>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>Supplier</th>
              <th>Warehouse</th>
              <th>Items</th>
              <th>Expected</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const idx = FLOW.indexOf(r.status);
              const showAdvance = idx >= 0 && idx < FLOW.length - 1;
              const nextLabel = idx === 0 ? 'Receive' : 'Complete';
              return (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{r.ref}</td>
                  <td>{r.supplier}</td>
                  <td style={{ opacity: 0.75 }}>{whName(r.warehouseId)}</td>
                  <td>{r.items} units</td>
                  <td style={{ opacity: 0.7 }}>{r.expectedDate}</td>
                  <td>
                    <span className={statusTagClass(r.status)}>{r.status}</span>
                  </td>
                  <td>
                    {showAdvance && (
                      <button className="btn btn-secondary" onClick={() => advance('stockIn', r.id, FLOW)}>
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
