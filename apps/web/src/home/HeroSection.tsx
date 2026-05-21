import type { CSSProperties } from 'react';
import { IconCash } from '../icons';
import { STAMPS, TODAY_GOAL, TODAY_POINT } from './domain';
import styles from './HeroSection.module.css';

function formatPoint(p: number): string {
  return p.toLocaleString('ko-KR');
}

function GuideButton() {
  return (
    <button type="button" className={styles.guideBtn}>
      포인트 가이드 ↗
    </button>
  );
}

function DailyStampBanner() {
  const doneCount = STAMPS.filter((s) => s.done).length;
  return (
    <div className={styles.stampBanner}>
      <div className={styles.stampHead}>
        <h3 className={styles.stampTitle}>매일 출석 도장</h3>
        <span className={styles.stampDays}>{doneCount}/7일 연속</span>
      </div>
      <div className={styles.stampRow} role="list" aria-label="주간 출석 도장">
        {STAMPS.map((s) => {
          const bubbleClass = [
            styles.stampBubble,
            s.done ? styles.done : '',
            s.today ? styles.today : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={s.day} className={styles.stampCell} role="listitem">
              <span className={styles.stampLabel}>{s.label}</span>
              <div className={bubbleClass} aria-label={s.done ? '완료' : s.today ? '오늘' : '예정'}>
                {s.done ? '✓' : s.day}
              </div>
              <span className={styles.stampReward}>+{s.reward}P</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const progress = Math.min(100, Math.round((TODAY_POINT / TODAY_GOAL) * 100));
  const progressStyle = { '--progress': `${progress}%` } as CSSProperties;
  return (
    <>
      <section className={styles.hero} aria-label="오늘의 포인트">
        <div className={styles.topRow}>
          <p className={styles.greeting}>도현님, 오늘도 화이팅!</p>
          <GuideButton />
        </div>
        <div className={styles.pointBlock}>
          <span className={styles.pointValue}>{formatPoint(TODAY_POINT)}</span>
          <span className={styles.pointUnit}>P</span>
        </div>
        <p className={styles.subText}>
          오늘 목표까지 <strong>{formatPoint(TODAY_GOAL - TODAY_POINT)}P</strong> 남았어요
        </p>
        <div className={styles.progressBar} aria-hidden>
          <div className={styles.progressFill} style={progressStyle} />
        </div>
        <div className={styles.actionRow}>
          <button type="button" className={styles.cashOut}>
            <IconCash size={16} /> 현금 출금하기
          </button>
          <button type="button" className={styles.history}>
            적립내역
          </button>
        </div>
      </section>
      <DailyStampBanner />
    </>
  );
}
