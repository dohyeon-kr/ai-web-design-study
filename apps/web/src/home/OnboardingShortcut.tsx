import { IconRocket } from '../icons';
import styles from './OnboardingShortcut.module.css';

const STEPS: { label: string; done: boolean }[] = [
  { label: '가입', done: true },
  { label: '본인인증', done: true },
  { label: '첫 미션', done: false },
  { label: '출금계좌', done: false },
];

const REWARD_POINT = 5000;

function formatPoint(p: number): string {
  return p.toLocaleString('ko-KR');
}

export default function OnboardingShortcut() {
  const remaining = STEPS.filter((s) => !s.done).length;
  const nextStep = STEPS.find((s) => !s.done);
  const currentIdx = STEPS.findIndex((s) => !s.done);
  return (
    <button type="button" className={styles.card} aria-label="온보딩 이어하기">
      <div className={styles.head}>
        <div className={styles.icon} aria-hidden>
          <IconRocket size={22} />
        </div>
        <div className={styles.body}>
          <h4 className={styles.title}>
            <b>{remaining}단계만</b>
            <span>더하면</span>
            <span className={styles.rewardChip}>+{formatPoint(REWARD_POINT)}P</span>
          </h4>
        </div>
      </div>
      <div className={styles.progress} role="progressbar" aria-valuenow={STEPS.length - remaining} aria-valuemin={0} aria-valuemax={STEPS.length}>
        {STEPS.map((s, i) => {
          const cls = [
            styles.segment,
            s.done ? styles.done : '',
            i === currentIdx ? styles.current : '',
          ]
            .filter(Boolean)
            .join(' ');
          return <span key={s.label} className={cls} />;
        })}
      </div>
      <div className={styles.statusRow}>
        <span className={styles.nextStep}>
          <span>다음:</span>
          <b>{nextStep?.label ?? '완료'}</b>
        </span>
        <span className={styles.cta}>이어하기</span>
      </div>
    </button>
  );
}
