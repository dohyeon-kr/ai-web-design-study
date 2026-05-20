import styles from './HeroBanner.module.css';
import { notify } from './notify';

type HeroBannerProps = {
  edition: string;
  title: string;
  caption: string;
};

export default function HeroBanner({ edition, title, caption }: HeroBannerProps) {
  return (
    <article className={styles.banner}>
      <img
        className={styles.visual}
        src="/images/hero-quiet-tailoring.jpg"
        alt="Editorial moodshot — quiet tailoring"
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.kicker}>WEEKLY EDIT</span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.edition}>VOL. {edition}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.caption}>{caption}</p>
        <button
          type="button"
          className={styles.cta}
          onClick={() => notify(`Weekly Edit ${edition} — 14벌 보러가기`)}
        >
          <span>VIEW EDIT</span>
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
