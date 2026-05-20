import styles from './SocialCard.module.css';

export default function SocialCard() {
  return (
    <nav className={styles.card} aria-label="Social links">
      <button type="button" className={styles.iconButton} aria-label="Instagram">
        <InstagramIcon />
      </button>
      <button type="button" className={styles.iconButton} aria-label="YouTube">
        <YouTubeIcon />
      </button>
      <button type="button" className={styles.iconButton} aria-label="Twitter">
        <TwitterIcon />
      </button>
    </nav>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M11 9.5v5l4-2.5z" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.5c0 .3 0 .6.1.9-3.3-.2-6.3-1.8-8.3-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4-.4.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.9a8 8 0 0 1-5 1.7c-.3 0-.6 0-1-.1A11.4 11.4 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z" />
    </svg>
  );
}
