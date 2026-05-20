import styles from './DailyChallengeCard.module.css';

type DailyChallengeCardProps = {
  title: string;
  due: string;
  extraCount: number;
};

export default function DailyChallengeCard({ title, due, extraCount }: DailyChallengeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.due}>{due}</p>
        <div className={styles.participants}>
          <div className={styles.avatarStack}>
            <Avatar tone="rose" />
            <Avatar tone="charcoal" />
            <Avatar tone="amber" />
          </div>
          <span className={styles.extraBadge}>+{extraCount}</span>
        </div>
      </div>
      <div className={styles.illustration} aria-hidden="true">
        <Illustration />
      </div>
    </article>
  );
}

function Avatar({ tone }: { tone: 'rose' | 'charcoal' | 'amber' }) {
  const className = `${styles.participantAvatar} ${styles[`tone_${tone}`]}`;

  if (tone === 'rose') {
    return (
      <svg className={className} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="14" fill="#f2a4b6" />
        <circle cx="8.2" cy="12.2" r="4" fill="#3a2418" />
        <circle cx="12.2" cy="7.7" r="4.2" fill="#3a2418" />
        <circle cx="17.4" cy="8.1" r="4.5" fill="#3a2418" />
        <circle cx="20.1" cy="12.9" r="4.2" fill="#3a2418" />
        <path
          d="M8.5 15.1c0-4.8 2.7-7.8 5.8-7.8s5.8 3 5.8 7.8c0 4.9-2.6 7.9-5.8 7.9s-5.8-3-5.8-7.9Z"
          fill="#efbd96"
        />
        <path d="M9.5 13c3.2-.5 5.8-2.3 7.1-4.9.8 2.3 1.9 3.7 3.5 4.5V8.4H9.5V13Z" fill="#3a2418" />
        <circle cx="12.2" cy="15.6" r="0.7" fill="#3a2418" />
        <circle cx="16.3" cy="15.6" r="0.7" fill="#3a2418" />
        <path
          d="M12.2 18.6c1.2 1 2.8 1 4 0"
          stroke="#854b2c"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (tone === 'charcoal') {
    return (
      <svg className={className} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="14" fill="#5e6067" />
        <path d="M8.1 13.1c0-4.2 2.7-6.8 6-6.8s5.9 2.6 5.9 6.8v2.2H8.1v-2.2Z" fill="#17171a" />
        <path
          d="M8.8 15.1c0-4.5 2.5-7.2 5.4-7.2s5.4 2.7 5.4 7.2c0 4.7-2.4 7.6-5.4 7.6s-5.4-2.9-5.4-7.6Z"
          fill="#f4c49a"
        />
        <path
          d="M8.8 12.1c1.7-3.5 5.6-5 10.8-2.8v4c-3-.3-5.5-1.1-7.7-2.8-.7 1.1-1.7 2-3.1 2.8v-1.2Z"
          fill="#17171a"
        />
        <circle cx="12.2" cy="15.7" r="0.7" fill="#17171a" />
        <circle cx="16.1" cy="15.7" r="0.7" fill="#17171a" />
        <path
          d="M12.5 18.7c1 .9 2.5.9 3.6 0"
          stroke="#7f4429"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="14" fill="#f3c98c" />
      <path d="M8 14.2c0-4.6 2.7-7.5 6.1-7.5s6.1 2.9 6.1 7.5v2.3H8v-2.3Z" fill="#7c5132" />
      <path
        d="M8.7 15.2c0-4.5 2.5-7.2 5.4-7.2s5.4 2.7 5.4 7.2c0 4.6-2.4 7.4-5.4 7.4s-5.4-2.8-5.4-7.4Z"
        fill="#e9b98f"
      />
      <path d="M8.8 12.5c2.9-.2 5.5-1.5 7.5-3.7.7 1.9 1.7 3.2 3.2 4V8.1H8.8v4.4Z" fill="#7c5132" />
      <circle cx="12.2" cy="15.8" r="0.7" fill="#3d2a20" />
      <circle cx="16.2" cy="15.8" r="0.7" fill="#3d2a20" />
      <path
        d="M12.3 18.6c1.1.9 2.6.9 3.8 0"
        stroke="#815034"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Illustration() {
  return (
    <svg viewBox="0 0 160 160" className={styles.illustrationSvg} aria-hidden="true">
      <ellipse cx="80" cy="138" rx="56" ry="10" fill="rgba(71, 57, 113, 0.16)" />
      <ellipse cx="49" cy="101" rx="24" ry="8" fill="rgba(38, 31, 61, 0.2)" />
      <path d="M27 56h44v42c0 4.6-9.9 8.4-22 8.4S27 102.6 27 98V56Z" fill="#3f4046" />
      <ellipse cx="49" cy="56" rx="22" ry="8.5" fill="#55565d" />
      <ellipse cx="49" cy="56" rx="14.5" ry="4.7" fill="#696a72" opacity="0.55" />
      <ellipse cx="107" cy="105" rx="31" ry="10" fill="rgba(63, 64, 70, 0.18)" />
      <path d="M76 83h62v20c0 6.1-13.9 11.1-31 11.1s-31-5-31-11.1V83Z" fill="#bfbac3" />
      <ellipse cx="107" cy="83" rx="31" ry="11" fill="#d9d4dc" />
      <ellipse cx="107" cy="83" rx="20" ry="6.5" fill="#eeeaf0" opacity="0.45" />
      <ellipse
        cx="98"
        cy="39"
        rx="34"
        ry="20"
        fill="rgba(63, 64, 70, 0.12)"
        transform="rotate(-12 98 39)"
      />
      <ellipse cx="98" cy="37" rx="34" ry="20" fill="#f9b22b" transform="rotate(-12 98 37)" />
      <ellipse cx="98" cy="37" rx="14" ry="8" fill="#b9a6f1" transform="rotate(-12 98 37)" />
      <path
        d="M65.8 44.1c5.4 8 19.2 12.4 35.7 8.9 16.2-3.4 28.2-13.1 29.8-22.5 2.8 11.5-10.9 24-29.1 27.9-18.6 3.9-34.7-2.5-36.4-14.3Z"
        fill="#d98d20"
        opacity="0.45"
      />
      <ellipse cx="119" cy="123" rx="30" ry="12" fill="rgba(63, 64, 70, 0.14)" />
      <path
        d="M91 120c0-13.2 11.1-23 26.5-23 16.4 0 30.5 10.3 30.5 23.8 0 11.8-11.8 19.5-29.5 19.5C102.4 140.3 91 132.2 91 120Z"
        fill="#e8a988"
      />
      <ellipse
        cx="110"
        cy="112"
        rx="12"
        ry="7"
        fill="#f0c0a3"
        opacity="0.75"
        transform="rotate(-19 110 112)"
      />
      <ellipse cx="56" cy="130" rx="24" ry="8" fill="rgba(63, 64, 70, 0.14)" />
      <ellipse cx="56" cy="124" rx="22" ry="14" fill="#fce449" transform="rotate(8 56 124)" />
      <ellipse cx="56" cy="124" rx="8.5" ry="5.2" fill="#b9a6f1" transform="rotate(8 56 124)" />
      <path
        d="M35.4 127.8c4.1 7 15.6 10.3 27.1 7.6 8.3-1.9 14.4-6.7 16-12-1 9.2-9 16.8-20.4 18.3-11.8 1.6-21.8-4-22.7-13.9Z"
        fill="#d3bd30"
        opacity="0.5"
      />
    </svg>
  );
}
