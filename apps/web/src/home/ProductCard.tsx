import { useState } from 'react';
import styles from './ProductCard.module.css';
import { notify } from './notify';

export type ProductTone = 'sand' | 'stone' | 'graphite' | 'fog' | 'ink' | 'clay';

export type Product = {
  id: string;
  brand: string;
  name: string;
  priceKrw: number;
  tone: ProductTone;
  imageSrc: string;
  badge?: 'NEW' | 'SALE' | 'RESTOCK';
};

type ProductCardProps = {
  product: Product;
};

const toneClass: Record<ProductTone, string> = {
  sand: styles.toneSand,
  stone: styles.toneStone,
  graphite: styles.toneGraphite,
  fog: styles.toneFog,
  ink: styles.toneInk,
  clay: styles.toneClay,
};

const krwFormatter = new Intl.NumberFormat('ko-KR');

export default function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false);

  function toggleSave(e: React.MouseEvent) {
    e.stopPropagation();
    setSaved((prev) => {
      const next = !prev;
      notify(next ? `${product.name} 저장됨` : `${product.name} 저장 취소`);
      return next;
    });
  }

  function openDetail() {
    notify(`${product.brand} · ${product.name}`);
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.imageFrame}
        onClick={openDetail}
        aria-label={`${product.brand} ${product.name} 상세보기`}
      >
        <img
          className={`${styles.image} ${toneClass[product.tone]}`}
          src={product.imageSrc}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
        />
        {product.badge ? (
          <span className={`${styles.badge} ${product.badge === 'SALE' ? styles.badgeSale : ''}`}>
            {product.badge}
          </span>
        ) : null}
        <span
          className={`${styles.saveButton} ${saved ? styles.saveButtonOn : ''}`}
          // biome-ignore lint/a11y/useSemanticElements: native checkbox conflicts with image-overlay styling; ARIA pattern preserves keyboard a11y
          role="checkbox"
          aria-label={saved ? '저장 취소' : '저장'}
          aria-checked={saved}
          tabIndex={0}
          onClick={toggleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleSave(e as unknown as React.MouseEvent);
            }
          }}
        >
          {saved ? <HeartFilled /> : <HeartOutline />}
        </span>
      </button>
      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>
          <span>{krwFormatter.format(product.priceKrw)}</span>
          <span className={styles.priceUnit}>원</span>
        </p>
      </div>
    </article>
  );
}

function HeartOutline() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 9c0 5.7-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartFilled() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 19s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 9c0 5.7-7 10-7 10Z" />
    </svg>
  );
}
