import { IconMedal } from '../icons';
import { RANKERS } from './domain';
import styles from './RankingPreview.module.css';

function medalSlot(rank: number): string {
  if (rank <= 3) return String(rank);
  return 'other';
}

function isMedalRank(rank: number): rank is 1 | 2 | 3 {
  return rank === 1 || rank === 2 || rank === 3;
}

function formatDelta(delta: number): string {
  return delta.toLocaleString('ko-KR').replace(/,/g, ',\u2060');
}

export default function RankingPreview() {
  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <h4 className={styles.title}>
          이번 주 <em>포인트 랭킹</em>
        </h4>
        <span className={styles.timer}>⏱ 3일 5시간 남음</span>
      </div>
      <div className={styles.list} role="list">
        {RANKERS.map((ranker) => {
          const rowClass = [styles.row, ranker.me ? styles.me : ''].filter(Boolean).join(' ');
          return (
            <div key={ranker.rank} className={rowClass} role="listitem">
              <div className={styles.medal} data-rank={medalSlot(ranker.rank)} aria-hidden>
                {isMedalRank(ranker.rank) ? <IconMedal rank={ranker.rank} size={20} /> : ranker.rank}
              </div>
              <div>
                <div className={styles.name}>{ranker.nickname}</div>
                <span className={styles.delta}>+{formatDelta(ranker.delta)}P 오늘</span>
              </div>
              <div className={styles.point}>
                {ranker.point.toLocaleString('ko-KR')}
                <span>P</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
