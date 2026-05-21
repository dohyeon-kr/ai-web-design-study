import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const base = (extra: Props): Props => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...extra,
});

export function MenuIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M5 8h14" />
      <path d="M9 14h10" />
    </svg>
  );
}

export function SearchIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function MicIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <rect x="9" y="3.5" width="6" height="11" rx="3" />
      <path d="M6 11.5a6 6 0 0 0 12 0" />
      <path d="M12 17.5v3" />
    </svg>
  );
}

export function BackIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M14.5 5 8 12l6.5 7" />
    </svg>
  );
}

export function HeartIcon({ filled, ...p }: Props & { filled?: boolean }) {
  return (
    <svg {...base(p)} fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />
    </svg>
  );
}

export function PlusIcon(p: Props) {
  return (
    <svg {...base(p)} strokeWidth={2.2}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronRightIcon(p: Props) {
  return (
    <svg {...base(p)} strokeWidth={2.2}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function StarIcon(p: Props) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z" />
    </svg>
  );
}

export function HomeIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function OffersIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <circle cx="8.5" cy="12" r="4" />
      <circle cx="15.5" cy="12" r="4" />
    </svg>
  );
}

export function BellIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function UserIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </svg>
  );
}

export function BagIcon(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M5.5 8h13l-1 11a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8L5.5 8z" />
      <path d="M9 10V7a3 3 0 1 1 6 0v3" />
    </svg>
  );
}
