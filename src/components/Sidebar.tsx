import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../nav';
import { Icon } from './Icon';

export function Sidebar() {
  return (
    <aside
      style={{
        width: 224,
        flex: 'none',
        borderRight: '1px solid var(--color-divider)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div
        style={{
          padding: '22px 20px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--color-divider)',
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <Icon name="warehouse" size={16} />
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>
          Waypoint <span style={{ color: 'var(--color-accent-700)' }}>WMS</span>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '14px 10px', overflow: 'auto', flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '9px 10px',
              cursor: 'pointer',
              background: isActive ? 'var(--color-accent-100)' : 'transparent',
              color: 'var(--color-text)',
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ display: 'flex', color: isActive ? 'var(--color-accent-700)' : 'var(--color-text)' }}>
                  <Icon name={item.icon} size={17} />
                </span>
                <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--color-divider)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--color-accent-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--color-accent-800)',
            flex: 'none',
          }}
        >
          AR
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Alex Reyes</div>
          <div style={{ fontSize: 11, opacity: 0.55 }}>Admin</div>
        </div>
        <span style={{ color: 'var(--color-text)', opacity: 0.5, display: 'flex' }}>
          <Icon name="logout" size={16} />
        </span>
      </div>
    </aside>
  );
}
