import { Corners } from '../components/Corners';
import { Icon } from '../components/Icon';
import { statusTagClass } from '../data/fixtures';
import { useWmsStore } from '../store';

export function Returns() {
  const returns = useWmsStore((s) => s.returns);
  const openModal = useWmsStore((s) => s.openModal);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => openModal('return')}>
          <Icon name="plus" size={14} /> New Return
        </button>
      </div>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden' }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>Type</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'var(--font-heading)' }}>{r.ref}</td>
                <td>
                  <span className="tag tag-neutral">{r.type}</span>
                </td>
                <td>{r.item}</td>
                <td>{r.qty}</td>
                <td style={{ opacity: 0.7 }}>{r.reason}</td>
                <td>
                  <span className={statusTagClass(r.status)}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
