import type { CSSProperties } from 'react';
import { PROMOTIONS } from './domain';
import styles from './PromotionCarousel.module.css';

export default function PromotionCarousel() {
  return (
    <div className={styles.scrollWrap}>
      <div className={styles.track} role="list" aria-label="프로모션">
        {PROMOTIONS.map((promo) => {
          const style = { '--promoSurface': promo.surface } as CSSProperties;
          return (
            <button
              type="button"
              key={promo.id}
              className={styles.card}
              style={style}
              role="listitem"
              aria-label={promo.title.replace(/\n/g, ' ')}
            >
              <span className={styles.badge}>{promo.badge}</span>
              <h4 className={styles.title}>{promo.title}</h4>
              <p className={styles.body}>{promo.body}</p>
              <span className={styles.cta}>{promo.cta} →</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
