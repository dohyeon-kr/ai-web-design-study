import styles from './Header.module.css';

type HeaderProps = {
  userName: string;
  dateLabel: string;
};

export default function Header({ userName, dateLabel }: HeaderProps) {
  return (
    <header className={styles.header}>
      <SandraAvatar />
      <div className={styles.greeting}>
        <div className={styles.greetingLine}>Hello, {userName}</div>
        <div className={styles.dateLine}>{dateLabel}</div>
      </div>
      <button type="button" className={styles.searchButton} aria-label="Search">
        <SearchIcon />
      </button>
    </header>
  );
}

function SandraAvatar() {
  return (
    <svg className={styles.avatar} width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#f3b265" />
      <path
        d="M10 21.5C10 12.8 15.7 8 22 8s12 4.8 12 13.5c0 4.3-1.9 8.8-5.2 11.2H15.2C11.9 30.3 10 25.8 10 21.5Z"
        fill="#3a2418"
      />
      <circle cx="13.2" cy="19.3" r="5.1" fill="#3a2418" />
      <circle cx="17.1" cy="12.6" r="4.9" fill="#3a2418" />
      <circle cx="24.2" cy="10.7" r="5.4" fill="#3a2418" />
      <circle cx="30.6" cy="15.1" r="5" fill="#3a2418" />
      <circle cx="32.2" cy="22.4" r="4.7" fill="#3a2418" />
      <path
        d="M14.6 22.5c0-6 3.5-9.8 7.4-9.8s7.4 3.8 7.4 9.8c0 6.4-3.3 10.3-7.4 10.3s-7.4-3.9-7.4-10.3Z"
        fill="#f0c19a"
      />
      <circle cx="13.9" cy="24" r="2.1" fill="#f0c19a" />
      <circle cx="30.1" cy="24" r="2.1" fill="#f0c19a" />
      <path d="M15.2 19.7c4.1-.8 7.4-3.1 9.2-6.5 1 3.2 2.6 5.2 5 6.3v-5.8H15.2v6Z" fill="#3a2418" />
      <circle cx="19.4" cy="23.7" r="1" fill="#3a2418" />
      <circle cx="24.8" cy="23.7" r="1" fill="#3a2418" />
      <path
        d="M19.4 27.6c1.7 1.6 3.7 1.6 5.2 0"
        stroke="#7a4428"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
