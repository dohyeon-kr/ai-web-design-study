import styles from './WeekStrip.module.css';

type WeekStripProps = {
  selectedDate: number;
};

type Day = { label: string; date: number; hasDot?: boolean };

const DAYS: Day[] = [
  { label: 'Sun', date: 22 },
  { label: 'Mon', date: 23, hasDot: true },
  { label: 'Tue', date: 24 },
  { label: 'Wed', date: 25 },
  { label: 'Thu', date: 26, hasDot: true },
  { label: 'Fri', date: 27 },
  { label: 'Sat', date: 28 },
];

export default function WeekStrip({ selectedDate }: WeekStripProps) {
  return (
    <div className={styles.strip} role="tablist" aria-label="Week">
      {DAYS.map(({ label, date, hasDot }) => {
        const isSelected = date === selectedDate;
        return (
          <button
            key={date}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`${styles.day} ${isSelected ? styles.daySelected : ''}`}
          >
            <span className={styles.dotSlot}>
              {hasDot || isSelected ? <span className={styles.dot} aria-hidden="true" /> : null}
            </span>
            <span className={styles.dayLabel}>{label}</span>
            <span className={styles.dayDate}>{date}</span>
          </button>
        );
      })}
    </div>
  );
}
