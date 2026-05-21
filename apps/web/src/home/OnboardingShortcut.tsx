import { IconRocket } from '../icons';
import styles from './OnboardingShortcut.module.css';

const STEPS: { label: string; done: boolean }[] = [
  { label: '가입', done: true },
  { label: '본인인증', done: true },
  { label: '첫 미션', done: false },
  { label: '출금계좌', done: false },
];

export default function OnboardingShortcut() {
  const remaining = STEPS.filter((s) => !s.done).length;
  return (
    <button type="button" className={styles.card} aria-label="온보딩 이어하기">
      <div className={styles.icon} aria-hidden>
        <IconRocket size={22} />
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>3단계만 더하면 5,000P 즉시 적립</h4>
        <div className={styles.steps}>
          {STEPS.map((s) => (
            <span key={s.label} className={[styles.step, s.done ? styles.done : ''].filter(Boolean).join(' ')}>
              {s.done ? '✓' : '○'} {s.label}
            </span>
          ))}
        </div>
      </div>
      <span className={styles.cta}>{remaining > 0 ? '이어하기' : '완료'}</span>
    </button>
  );
}
