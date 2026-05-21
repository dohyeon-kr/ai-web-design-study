import type { CSSProperties } from 'react';
import { type TaskCard, TASKS } from './domain';
import styles from './TaskGrid.module.css';

function TaskCardView({ task }: { task: TaskCard }) {
  const style = {
    '--cardSurface': task.cardSurface,
    '--iconBg': task.iconBg,
  } as CSSProperties;
  return (
    <button type="button" className={styles.card} style={style} aria-label={`${task.label} 미션 시작`}>
      <div className={styles.cardTopRow}>
        <div className={styles.icon} aria-hidden>
          <task.Icon size={20} />
        </div>
        {task.hot && <span className={styles.hotBadge}>HOT</span>}
      </div>
      <p className={styles.label}>{task.label}</p>
      <h4 className={styles.headline}>{task.headline}</h4>
      <div className={styles.footer}>
        <span className={styles.reward}>
          +{task.reward.toLocaleString('ko-KR')}
          <span>P</span>
        </span>
        <span className={styles.remaining}>
          {task.remaining}/{task.total}
        </span>
      </div>
    </button>
  );
}

export default function TaskGrid() {
  return (
    <div className={styles.grid} role="list" aria-label="포인트 적립 미션">
      {TASKS.map((task) => (
        <div role="listitem" key={task.type}>
          <TaskCardView task={task} />
        </div>
      ))}
    </div>
  );
}
