import { Corners } from '../components/Corners';
import { PERMISSIONS, whName } from '../data/fixtures';
import { useWmsStore } from '../store';

export function Users() {
  const users = useWmsStore((s) => s.users);

  return (
    <>
      <div className="blueprint" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <Corners />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td style={{ opacity: 0.7 }}>{u.email}</td>
                <td>
                  <span className="tag tag-accent">{u.role}</span>
                </td>
                <td style={{ opacity: 0.75 }}>{u.warehouseId === 'all' ? 'All Warehouses' : whName(u.warehouseId)}</td>
                <td>
                  <span className={u.status === 'Active' ? 'tag tag-accent' : 'tag tag-outline'}>{u.status}</span>
                </td>
                <td style={{ opacity: 0.6 }}>{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Role Permission Matrix</div>
        <table className="table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Admin</th>
              <th>Manager</th>
              <th>Warehouse Staff</th>
              <th>Stock Controller</th>
              <th>Viewer</th>
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((p) => (
              <tr key={p.module}>
                <td style={{ fontWeight: 500 }}>{p.module}</td>
                <td style={{ opacity: 0.8, fontSize: 12.5 }}>{p.admin}</td>
                <td style={{ opacity: 0.8, fontSize: 12.5 }}>{p.manager}</td>
                <td style={{ opacity: 0.8, fontSize: 12.5 }}>{p.staff}</td>
                <td style={{ opacity: 0.8, fontSize: 12.5 }}>{p.controller}</td>
                <td style={{ opacity: 0.8, fontSize: 12.5 }}>{p.viewer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
