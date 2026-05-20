import type { Route } from '../shared/routing';
import styles from './Header.module.css';

type Section = 'landing' | 'showcase';

type Props = {
  active: Section;
  onNavigate: (route: Route) => void;
};

const NAV_ITEMS: { id: Section; label: string; route: Route }[] = [
  { id: 'landing', label: '연구 소개', route: { name: 'landing' } },
  { id: 'showcase', label: '쇼케이스', route: { name: 'showcase', exampleSlug: null } },
];

export default function Header({ active, onNavigate }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => onNavigate({ name: 'landing' })}
        >
          <span className={styles.brandMark} aria-hidden>
            ai
          </span>
          <span className={styles.brandLabel}>
            <span>ai-web-design-study</span>
            <span className={styles.brandSub}>Agent × CSS — research notes</span>
          </span>
        </button>
        <nav className={styles.nav} aria-label="주요 섹션">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
              onClick={() => onNavigate(item.route)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
