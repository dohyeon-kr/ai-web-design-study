import styles from './BottomNav.module.css';

type NavItem = {
  key: 'home' | 'apps' | 'stats' | 'profile';
  label: string;
  icon: () => JSX.Element;
};

const ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', icon: HomeIcon },
  { key: 'apps', label: 'Apps', icon: AppsIcon },
  { key: 'stats', label: 'Stats', icon: StatsIcon },
  { key: 'profile', label: 'Profile', icon: ProfileIcon },
];

export default function BottomNav() {
  const activeKey: NavItem['key'] = 'home';
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
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
              >
                <Icon />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="13" width="4" height="7" rx="1" />
      <rect x="10" y="8" width="4" height="12" rx="1" />
      <rect x="16" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
