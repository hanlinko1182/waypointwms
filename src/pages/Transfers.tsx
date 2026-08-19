import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { statusTagClass, whCode } from '../data/fixtures';
import { useWmsStore } from '../store';

const FLOW = ['Pending Approval', 'Approved', 'In Transit', 'Completed'];

export function Transfers() {
  const warehouseId = useWmsStore((s) => s.warehouseId);
  const transfers = useWmsStore((s) => s.transfers);
  const openModal = useWmsStore((s) => s.openModal);
  const advance = useWmsStore((s) => s.advance);
  const reject = useWmsStore((s) => s.reject);

  const inWh = (w: string) => warehouseId === 'all' || w === warehouseId;
  const rows = transfers.filter((r) => inWh(r.fromId) || inWh(r.toId));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => openModal('transfer')}>
          <Icon name="plus" size={14} /> New Transfer
        </button>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>From</th>
              <th>To</th>
              <th>Items</th>
              <th>Requested By</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const idx = FLOW.indexOf(r.status);
              const showApprove = r.status === 'Pending Approval';
              const showAdvance = idx >= 0 && idx < FLOW.length - 1;
              const nextLabel = idx === 0 ? 'Approve' : idx === 1 ? 'Mark In Transit' : 'Mark Completed';
              return (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{r.ref}</td>
                  <td style={{ opacity: 0.75 }}>{whCode(r.fromId)}</td>
                  <td style={{ opacity: 0.75 }}>{whCode(r.toId)}</td>
                  <td>{r.items} units</td>
                  <td style={{ opacity: 0.75 }}>{r.requestedBy}</td>
                  <td>
                    <span className={statusTagClass(r.status)}>{r.status}</span>
                  </td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    {showApprove && (
                      <button className="btn btn-secondary" onClick={() => reject(r.id)}>
                        Reject
                      </button>
                    )}
                    {showAdvance && (
                      <button className="btn btn-secondary" onClick={() => advance('transfers', r.id, FLOW)}>
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
