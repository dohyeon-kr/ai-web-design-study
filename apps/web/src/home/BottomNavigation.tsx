import type { ComponentType } from 'react';
import { IconChart, IconHome, IconPlus, IconTarget, IconWallet } from '../icons';
import styles from './BottomNavigation.module.css';

const ITEMS: { icon: ComponentType<{ size?: number }>; label: string; key: string }[] = [
  { icon: IconHome, label: '홈', key: 'home' },
  { icon: IconTarget, label: '미션', key: 'mission' },
  { icon: IconChart, label: '랭킹', key: 'rank' },
  { icon: IconWallet, label: '내지갑', key: 'wallet' },
];

export default function BottomNavigation() {
  return (
    <nav className={styles.nav} aria-label="주요 메뉴">
      {ITEMS.slice(0, 2).map((it) => (
        <button
          type="button"
          key={it.key}
          className={[styles.item, it.key === 'home' ? styles.active : ''].filter(Boolean).join(' ')}
          aria-current={it.key === 'home' ? 'page' : undefined}
        >
          <span className={styles.icon} aria-hidden>
            <it.icon size={20} />
          </span>
          <span className={styles.label}>{it.label}</span>
        </button>
      ))}
      <div className={styles.action}>
        <button type="button" className={styles.actionBtn} aria-label="포인트 적립 시작">
          <IconPlus size={24} />
        </button>
        <span className={styles.actionLabel}>적립</span>
      </div>
      {ITEMS.slice(2).map((it) => (
        <button type="button" key={it.key} className={styles.item}>
          <span className={styles.icon} aria-hidden>
            <it.icon size={20} />
          </span>
          <span className={styles.label}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
