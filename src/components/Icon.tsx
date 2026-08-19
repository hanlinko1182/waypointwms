type IconName =
  | 'dashboard'
  | 'box'
  | 'layers'
  | 'warehouse'
  | 'arrowDown'
  | 'arrowUp'
  | 'shuffle'
  | 'undo'
  | 'alert'
  | 'chart'
  | 'users'
  | 'settings'
  | 'search'
  | 'bell'
  | 'chevronDown'
  | 'chevronRight'
  | 'plus'
  | 'check'
  | 'building'
  | 'qrcode'
  | 'logout';

const common = (size: number, color?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color ?? 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const sets: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x={3} y={3} width={7} height={7} />
      <rect x={14} y={3} width={7} height={5} />
      <rect x={14} y={10} width={7} height={11} />
      <rect x={3} y={12} width={7} height={9} />
    </>
  ),
  box: (
    <>
      <polyline points="3,7 12,3 21,7 12,11 3,7" />
      <polyline points="3,7 3,17 12,21 21,17 21,7" />
      <line x1={12} y1={11} x2={12} y2={21} />
    </>
  ),
  layers: (
    <>
      <polyline points="3,7 12,3 21,7 12,11 3,7" />
      <polyline points="3,12 12,16 21,12" />
      <polyline points="3,17 12,21 21,17" />
    </>
  ),
  warehouse: (
    <>
      <polyline points="3,10 12,4 21,10" />
      <rect x={4} y={10} width={16} height={10} />
      <line x1={9} y1={20} x2={9} y2={14} />
      <line x1={15} y1={20} x2={15} y2={14} />
    </>
  ),
  arrowDown: (
    <>
      <line x1={12} y1={4} x2={12} y2={16} />
      <polyline points="6,11 12,17 18,11" />
      <line x1={5} y1={20} x2={19} y2={20} />
    </>
  ),
  arrowUp: (
    <>
      <line x1={12} y1={20} x2={12} y2={8} />
      <polyline points="6,13 12,7 18,13" />
      <line x1={5} y1={4} x2={19} y2={4} />
    </>
  ),
  shuffle: (
    <>
      <polyline points="3,7 8,7 13,17 21,17" />
      <polyline points="17,13 21,17 17,21" />
      <polyline points="3,17 8,17 13,7 21,7" />
      <polyline points="17,3 21,7 17,11" />
    </>
  ),
  undo: (
    <>
      <path d="M5 12a7 7 0 1 0 2 -5" />
      <polyline points="3,4 4,8 8,7" />
    </>
  ),
  alert: (
    <>
      <polygon points="12,3 22,20 2,20" />
      <line x1={12} y1={10} x2={12} y2={15} />
      <line x1={12} y1={17.4} x2={12} y2={17.6} />
    </>
  ),
  chart: (
    <>
      <line x1={4} y1={20} x2={4} y2={12} />
      <line x1={11} y1={20} x2={11} y2={6} />
      <line x1={18} y1={20} x2={18} y2={15} />
      <line x1={3} y1={20} x2={21} y2={20} />
    </>
  ),
  users: (
    <>
      <circle cx={9} cy={8} r={3.2} />
      <path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6" />
      <circle cx={17.5} cy={9} r={2.4} />
      <path d="M15.5 14.2c2.5 0.3 4.5 2.6 4.5 5.8" />
    </>
  ),
  settings: (
    <>
      <circle cx={12} cy={12} r={3} />
      <path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
    </>
  ),
  search: (
    <>
      <circle cx={10.5} cy={10.5} r={6.5} />
      <line x1={20} y1={20} x2={15.5} y2={15.5} />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  chevronDown: <polyline points="5,9 12,16 19,9" />,
  chevronRight: <polyline points="9,5 16,12 9,19" />,
  plus: (
    <>
      <line x1={12} y1={4} x2={12} y2={20} />
      <line x1={4} y1={12} x2={20} y2={12} />
    </>
  ),
  check: <polyline points="4,13 9,18 20,6" />,
  building: (
    <>
      <rect x={5} y={3} width={14} height={18} />
      <line x1={9} y1={7} x2={9} y2={7.01} />
      <line x1={15} y1={7} x2={15} y2={7.01} />
      <line x1={9} y1={11} x2={9} y2={11.01} />
      <line x1={15} y1={11} x2={15} y2={11.01} />
      <line x1={9} y1={15} x2={9} y2={15.01} />
      <line x1={15} y1={15} x2={15} y2={15.01} />
    </>
  ),
  qrcode: (
    <>
      <rect x={3} y={3} width={7} height={7} />
      <rect x={14} y={3} width={7} height={7} />
      <rect x={3} y={14} width={7} height={7} />
      <rect x={15} y={15} width={2} height={2} fill="currentColor" stroke="none" />
      <rect x={19} y={15} width={2} height={2} fill="currentColor" stroke="none" />
      <rect x={15} y={19} width={2} height={2} fill="currentColor" stroke="none" />
      <rect x={19} y={19} width={2} height={2} fill="currentColor" stroke="none" />
    </>
  ),
  logout: (
    <>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <line x1={14} y1={12} x2={21} y2={12} />
      <polyline points="17,8 21,12 17,16" />
    </>
  ),
};

export function Icon({ name, size = 18, color }: { name: IconName; size?: number; color?: string }) {
  return <svg {...common(size, color)}>{sets[name]}</svg>;
}
