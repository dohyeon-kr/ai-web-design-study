import styles from './PlanCard.module.css';

type PlanCardProps = {
  tone: 'warm' | 'cool';
  tag: string;
  title: string;
  date: string;
  time: string;
  room: string;
  trainerName?: string;
};

export default function PlanCard({
  tone,
  tag,
  title,
  date,
  time,
  room,
  trainerName,
}: PlanCardProps) {
  return (
    <article className={`${styles.card} ${styles[`tone_${tone}`]}`}>
      <div className={styles.body}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <dl className={styles.meta}>
          <div className={styles.metaRow}>{date}</div>
          <div className={styles.metaRow}>{time}</div>
          <div className={styles.metaRow}>{room}</div>
        </dl>
        {tone === 'cool' ? (
          <div className={styles.balanceArt} aria-hidden="true">
            <BalanceArt />
          </div>
        ) : null}
      </div>
      {trainerName ? (
        <footer className={styles.trainer}>
          <TrainerAvatar />
          <div className={styles.trainerText}>
            <span className={styles.trainerRole}>Trainer</span>
            <span className={styles.trainerName}>{trainerName}</span>
          </div>
        </footer>
      ) : null}
    </article>
  );
}

function BalanceArt() {
  return (
    <svg viewBox="0 0 110 70" className={styles.balanceSvg} aria-hidden="true">
      <ellipse cx="55" cy="59" rx="42" ry="7" fill="rgba(0, 0, 0, 0.06)" />
      <ellipse cx="28" cy="56" rx="15" ry="5" fill="rgba(0, 0, 0, 0.06)" />
      <ellipse cx="84" cy="57" rx="16" ry="5" fill="rgba(0, 0, 0, 0.06)" />
      <path
        d="M19 48.5c0-7.1 5.2-12.1 12.4-12.1 6.5 0 11.6 4.4 11.6 10.8 0 6.2-5.9 10-14.2 10-6.2 0-9.8-3.1-9.8-8.7Z"
        fill="#8b9aa8"
      />
      <path
        d="M70 48.7c0-6.7 5.8-11 13.6-11 6.5 0 11.9 3.9 11.9 9.5 0 6.7-6.5 10.7-15.2 10.7-6.1 0-10.3-3.5-10.3-9.2Z"
        fill="#96a4b1"
      />
      <path
        d="M31 49.2c0-17.2 11.6-31.2 27.3-31.2 15.9 0 27.9 14.1 27.9 31.6 0 6.4-11.9 11.4-27.6 11.4S31 56.1 31 49.2Z"
        fill="#e8c1a3"
      />
      <path
        d="M39.2 44.8c2.5-11.7 10.6-19.9 20.5-19.9 7.6 0 14.1 4.8 18.1 12.4-5-4-11-6.4-17.9-6.4-8.5 0-15.5 5.5-20.7 13.9Z"
        fill="#f0d6bd"
        opacity="0.8"
      />
      <path
        d="M33.8 50.1c6 5.1 14.2 7.5 24.8 7.5 10.9 0 19.5-2.4 25.3-7.2-1.2 6.1-12.2 10.6-25.3 10.6-13.7 0-24.4-4.4-24.8-10.9Z"
        fill="#d5a983"
        opacity="0.45"
      />
    </svg>
  );
}

function TrainerAvatar() {
  return (
    <svg
      className={styles.trainerAvatar}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#f6c67d" />
      <path
        d="M8.5 19c0-7.9 4.2-12.4 9.7-12.4S28 11.1 28 19c0 6.5-3.7 11.4-9.8 11.4S8.5 25.5 8.5 19Z"
        fill="#c78c32"
      />
      <circle cx="11.7" cy="17.1" r="3.9" fill="#d6a245" />
      <circle cx="16.6" cy="10.4" r="4.7" fill="#d6a245" />
      <circle cx="22.7" cy="11.5" r="4.5" fill="#d6a245" />
      <circle cx="25.3" cy="17.4" r="3.7" fill="#d6a245" />
      <path
        d="M11.4 18.9c0-5.3 3-8.7 6.7-8.7s6.7 3.4 6.7 8.7c0 5.7-2.9 9.2-6.7 9.2s-6.7-3.5-6.7-9.2Z"
        fill="#f0c19a"
      />
      <path d="M11.8 16.4c4.1-.5 7.2-2.5 9-5.6.8 2.6 2.1 4.4 4 5.5v-5.5h-13v5.6Z" fill="#d6a245" />
      <circle cx="15.6" cy="20" r="0.8" fill="#3a2418" />
      <circle cx="20.4" cy="20" r="0.8" fill="#3a2418" />
      <path
        d="M15.5 23.2c1.6 1.4 3.5 1.4 5 0"
        stroke="#864c2d"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="13.2" cy="21.5" r="1.5" fill="#edae93" opacity="0.55" />
      <circle cx="22.8" cy="21.5" r="1.5" fill="#edae93" opacity="0.55" />
    </svg>
  );
}
