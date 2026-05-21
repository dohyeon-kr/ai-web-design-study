import { BrandMark, IconBell, IconSearch } from '../icons';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.logo} aria-hidden>
          <BrandMark size={20} />
        </div>
        <span className={styles.brand}>포인트팡</span>
      </div>
      <div className={styles.right}>
        <button type="button" className={styles.iconBtn} aria-label="검색">
          <IconSearch size={16} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="알림">
          <IconBell size={16} />
          <span className={styles.dot} aria-hidden />
        </button>
        <div className={styles.profile} aria-label="내 프로필">
          도
        </div>
      </div>
    </header>
  );
}
