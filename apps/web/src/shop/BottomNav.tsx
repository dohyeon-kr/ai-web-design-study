import { BellIcon, HomeIcon, OffersIcon, UserIcon } from './icons';
import styles from './BottomNav.module.css';

type TabKey = 'home' | 'offers' | 'alerts' | 'profile';

type Props = {
  active: TabKey;
  cartCount: number;
  onChange: (key: TabKey) => void;
};

export default function BottomNav({ active, cartCount, onChange }: Props) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <button
        type="button"
        className={styles.tab}
        data-active={active === 'home'}
        onClick={() => onChange('home')}
        aria-label="Home"
      >
        <HomeIcon width={22} height={22} />
      </button>
      <button
        type="button"
        className={styles.tab}
        data-active={active === 'offers'}
        onClick={() => onChange('offers')}
        aria-label="Offers"
      >
        <OffersIcon width={22} height={22} />
        {cartCount > 0 && <span className={styles.badge} key={cartCount}>{cartCount}</span>}
      </button>
      <button
        type="button"
        className={styles.tab}
        data-active={active === 'alerts'}
        onClick={() => onChange('alerts')}
        aria-label="Alerts"
      >
        <BellIcon width={22} height={22} />
      </button>
      <button
        type="button"
        className={styles.tab}
        data-active={active === 'profile'}
        onClick={() => onChange('profile')}
        aria-label="Profile"
      >
        <UserIcon width={22} height={22} />
      </button>
    </nav>
  );
}
