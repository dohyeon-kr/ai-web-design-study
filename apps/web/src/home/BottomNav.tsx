import { useState } from 'react';
import styles from './BottomNav.module.css';

type NavKey = 'shop' | 'discover' | 'brand' | 'saved' | 'my';

type NavItem = {
  key: NavKey;
  label: string;
  icon: () => JSX.Element;
};

const ITEMS: NavItem[] = [
  { key: 'shop', label: 'Shop', icon: ShopIcon },
  { key: 'discover', label: 'Discover', icon: DiscoverIcon },
  { key: 'brand', label: 'Brand', icon: BrandIcon },
  { key: 'saved', label: 'Saved', icon: SavedIcon },
  { key: 'my', label: 'My', icon: MyIcon },
];

export default function BottomNav() {
  const [activeKey, setActiveKey] = useState<NavKey>('shop');
  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul className={styles.list}>
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeKey;
          return (
            <li key={item.key} className={styles.item}>
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
                onClick={() => setActiveKey(item.key)}
              >
                <Icon />
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ShopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 8h14l-1 12H6L5 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6.2a3 3 0 0 1 6 0V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DiscoverIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m10 10 5-2-2 5-5 2 2-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SavedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4h12v17l-6-4-6 4V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 20c1.4-3.3 4.3-4.8 7.5-4.8s6.1 1.5 7.5 4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
