import styles from './SectionHeader.module.css';
import { notify } from './notify';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  trailing?: string;
};

export default function SectionHeader({ eyebrow, title, trailing }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {trailing ? (
        <button
          type="button"
          className={styles.trailing}
          onClick={() => notify(`${title} — 전체보기`)}
        >
          {trailing}
        </button>
      ) : null}
    </header>
  );
}
