import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { statusTagClass, whName } from '../data/fixtures';
import { useWmsStore } from '../store';

export function Damaged() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const damaged = useWmsStore((s) => s.damaged);
  const openModal = useWmsStore((s) => s.openModal);
  const toggleQuarantine = useWmsStore((s) => s.toggleQuarantine);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const rows = damaged.filter((r) => inWh(r.warehouseId));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => openModal('damage')}>
          <Icon name="plus" size={14} /> Report Damage
        </button>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Warehouse</th>
              <th>Reason</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'var(--font-heading)' }}>{r.ref}</td>
                <td>{r.item}</td>
                <td>{r.qty}</td>
                <td style={{ opacity: 0.75 }}>{whName(r.warehouseId)}</td>
                <td style={{ opacity: 0.7 }}>{r.reason}</td>
                <td>
                  <span className={statusTagClass(r.status)}>{r.status}</span>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => toggleQuarantine(r.id)}>
                    {r.quarantined ? 'Release' : 'Quarantine'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
