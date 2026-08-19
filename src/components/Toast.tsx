import { useWmsStore } from '../store';
import { Icon } from './Icon';

export function Toast() {
  const toast = useWmsStore((s) => s.toast);
  if (!toast) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 28,
        background: 'var(--color-accent-900)',
        color: '#fff',
        padding: '12px 18px',
        fontSize: 13,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Icon name="check" size={14} /> {toast}
    </div>
  );
}
