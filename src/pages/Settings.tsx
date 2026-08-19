import { Corners } from '../components/Corners';
import { WAREHOUSES } from '../data/fixtures';
import { useWmsStore } from '../store';

export function Settings() {
  const settings = useWmsStore((s) => s.settings);
  const updateSetting = useWmsStore((s) => s.updateSetting);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Organization</div>
        <div className="field">
          <label>Company Name</label>
          <input className="input" value={settings.orgName} onChange={(e) => updateSetting('orgName', e.target.value)} />
        </div>
        <div className="field">
          <label>Timezone</label>
          <select className="input" value={settings.timezone} onChange={(e) => updateSetting('timezone', e.target.value)}>
            <option>America/Chicago</option>
            <option>America/Los_Angeles</option>
            <option>America/New_York</option>
          </select>
        </div>
        <div className="field">
          <label>Currency</label>
          <select className="input" value={settings.currency} onChange={(e) => updateSetting('currency', e.target.value)}>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
      </div>

      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Warehouse Defaults</div>
        <div className="field">
          <label>Default Warehouse</label>
          <select
            className="input"
            value={settings.defaultWarehouse}
            onChange={(e) => updateSetting('defaultWarehouse', e.target.value)}
          >
            {WAREHOUSES.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Low Stock Threshold (%)</label>
          <input
            className="input"
            type="number"
            value={settings.lowStockPct}
            onChange={(e) => updateSetting('lowStockPct', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Notifications</div>
        <label className="radio" style={{ marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={settings.notifyLowStock}
            onChange={() => updateSetting('notifyLowStock', !settings.notifyLowStock)}
          />
          Email alert on low stock
        </label>
        <br />
        <label className="radio" style={{ marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={settings.notifyDailyReport}
            onChange={() => updateSetting('notifyDailyReport', !settings.notifyDailyReport)}
          />
          Send daily stock report
        </label>
        <br />
        <label className="radio">
          <input
            type="checkbox"
            checked={settings.notifyTransferApproval}
            onChange={() => updateSetting('notifyTransferApproval', !settings.notifyTransferApproval)}
          />
          Alert on transfer approval needed
        </label>
      </div>

      <div className="blueprint" style={{ padding: 20 }}>
        <Corners />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Security</div>
        <div className="field">
          <label>Password Policy</label>
          <input className="input" disabled value="Min. 12 characters, 1 number, 1 symbol" />
        </div>
        <div className="field">
          <label>Session Timeout</label>
          <select
            className="input"
            value={settings.sessionTimeout}
            onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
          >
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>4 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
}
