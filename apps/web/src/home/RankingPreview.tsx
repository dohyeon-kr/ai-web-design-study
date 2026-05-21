import type { CSSProperties } from 'react';
import { type Ranker, RANKERS } from './domain';
import styles from './RankingPreview.module.css';

const MEDAL_IMG: Record<1 | 2 | 3, string> = {
  1: 'images/medal-gold.png',
  2: 'images/medal-silver.png',
  3: 'images/medal-bronze.png',
};

/* coral-family tonal: 1위는 darker, 점차 muted로 */
const AVATAR_BG = ['#ff6b3d', '#ff9050', '#d8956b', '#b87d5e', '#a26b50', '#8b5a45'];

function avatarColor(rank: number): string {
  return AVATAR_BG[(rank - 1) % AVATAR_BG.length];
}

function isMedalRank(rank: number): rank is 1 | 2 | 3 {
  return rank === 1 || rank === 2 || rank === 3;
}

function formatPoint(p: number): string {
  return p.toLocaleString('ko-KR');
}

function RankRow({ ranker, topPoint }: { ranker: Ranker; topPoint: number }) {
  const ratio = Math.round((ranker.point / topPoint) * 100);
  const initial = ranker.nickname.slice(0, 1);
  const avatarStyle = { '--avatarBg': avatarColor(ranker.rank) } as CSSProperties;
  const fillStyle = { '--ratio': `${ratio}%` } as CSSProperties;
  const rowClass = [styles.row, ranker.rank === 1 ? styles.top1 : ''].filter(Boolean).join(' ');
  return (
    <div className={rowClass} role="listitem">
      <div className={styles.medalWrap}>
        {isMedalRank(ranker.rank) ? (
          <img
            src={`${import.meta.env.BASE_URL}${MEDAL_IMG[ranker.rank]}`}
            alt=""
            className={styles.medalImg}
            width="44"
            height="44"
            aria-hidden
          />
        ) : (
          <div className={styles.medal} data-rank="other" aria-hidden>
            {ranker.rank}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.avatar} style={avatarStyle} aria-hidden>
            {initial}
          </span>
          <span className={styles.name}>{ranker.nickname}</span>
        </div>
        <span className={styles.delta}>+{formatPoint(ranker.delta)}P 오늘</span>
      </div>
      <div className={styles.scoreCol}>
        <span className={styles.point}>
          {formatPoint(ranker.point)}
          <span>P</span>
        </span>
        <div className={styles.scoreBar} aria-hidden>
          <div className={styles.scoreFill} style={fillStyle} />
        </div>
      </div>
    </div>
  );
}

function MyRankCard({ me, topPoint }: { me: Ranker; topPoint: number }) {
  const gap = topPoint - me.point;
  const initial = me.nickname.slice(0, 1);
  const avatarStyle = { '--avatarBg': 'var(--surface-hero)' } as CSSProperties;
  return (
    <>
      <div className={styles.divider} aria-hidden />
      <span className={styles.meLabel}>내 순위</span>
      <div className={styles.meCard}>
        <div className={styles.meRank} aria-label={`${me.rank}위`}>
          {me.rank}
        </div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <span className={styles.avatar} style={avatarStyle} aria-hidden>
              {initial}
            </span>
            <span className={styles.name}>{me.nickname}</span>
          </div>
          <span className={styles.gap}>
            TOP 1까지 <b>{formatPoint(gap)}P</b> 차이
          </span>
        </div>
        <div className={styles.scoreCol}>
          <span className={styles.point}>
            {formatPoint(me.point)}
            <span>P</span>
          </span>
          <span className={styles.delta}>+{formatPoint(me.delta)}P 오늘</span>
        </div>
      </div>
    </>
  );
}

export default function RankingPreview() {
  const others = RANKERS.filter((r) => !r.me);
  const me = RANKERS.find((r) => r.me);
  const topPoint = others[0]?.point ?? 1;
  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <h4 className={styles.title}>
          이번 주 <em>포인트 랭킹</em>
        </h4>
        <span className={styles.timer}>3일 5시간 남음</span>
      </div>
      <div className={styles.list} role="list">
        {others.map((ranker) => (
          <RankRow key={ranker.rank} ranker={ranker} topPoint={topPoint} />
        ))}
      </div>
      {me && <MyRankCard me={me} topPoint={topPoint} />}
    </div>
  );
}
