import styles from './Header.module.css';
import { notify } from './notify';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>RACK</span>
        <span className={styles.logoDot}>.</span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="검색"
          onClick={() => notify('검색 — 준비 중')}
        >
          <SearchIcon />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="장바구니"
          onClick={() => notify('장바구니에 3개 담겨 있어요')}
        >
          <BagIcon />
          <span className={styles.bagDot} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
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
