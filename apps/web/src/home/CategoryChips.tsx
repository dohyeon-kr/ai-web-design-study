import { useState } from 'react';
import styles from './CategoryChips.module.css';

const CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'outer', label: 'OUTER' },
  { id: 'top', label: 'TOP' },
  { id: 'bottom', label: 'BOTTOM' },
  { id: 'shoes', label: 'SHOES' },
  { id: 'acc', label: 'ACC' },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

type CategoryChipsProps = {
  defaultId?: CategoryId;
};

export default function CategoryChips({ defaultId = 'all' }: CategoryChipsProps) {
  const [activeId, setActiveId] = useState<CategoryId>(defaultId);
  return (
    <nav className={styles.row} aria-label="카테고리">
      <ul className={styles.list}>
        {CATEGORIES.map((c) => {
          const isActive = c.id === activeId;
          return (
            <li key={c.id}>
              <button
                type="button"
                className={`${styles.chip} ${isActive ? styles.active : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveId(c.id)}
              >
                {c.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
