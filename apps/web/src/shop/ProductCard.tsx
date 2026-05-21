import { useState } from 'react';
import FruitArt from './FruitArt';
import styles from './ProductCard.module.css';
import { ChevronDownIcon, HeartIcon } from './icons';
import type { Product, SizeKey } from './types';

type Props = {
  product: Product;
  selectedSize: SizeKey;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
  onAdd: () => void;
};

export default function ProductCard({
  product,
  selectedSize,
  isFavorite,
  onOpen,
  onToggleFavorite,
  onAdd,
}: Props) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <button
      type="button"
      className={styles.card}
      data-surface={product.cardSurface}
      onClick={onOpen}
      aria-label={`Open ${product.subtitle}`}
    >
      <div className={styles.topRow}>
        <span className={styles.title}>{product.name}</span>
        <span
          className={styles.fav}
          data-on={isFavorite}
          onClick={handleFav}
          role="button"
          aria-label="Toggle favorite"
        >
          <HeartIcon filled={isFavorite} width={18} height={18} />
        </span>
      </div>

      <div className={styles.fruit}>
        <FruitArt src={product.imageSrc} alt={product.imageAlt} />
      </div>

      <div className={styles.bottom}>
        <div>
          <div className={styles.subtitle}>{product.subtitle}</div>
          <div className={styles.variety}>
            {product.variety.split(' at ')[0]} at{' '}
            <span className={styles.varietyStrong}>Rs.{Math.round(product.pricePerKg * 1.5)}</span>{' '}
            Only
          </div>
        </div>

        <div className={styles.sizeRow}>
          <span className={styles.sizeLabel}>Kg</span>
          <span className={styles.sizePill}>
            {selectedSize}
            <ChevronDownIcon width={14} height={14} />
          </span>
        </div>

        <span className={styles.addButton} data-added={justAdded} onClick={handleAdd} role="button">
          {justAdded ? 'ADDED ✓' : 'ADD TO CART'}
        </span>
      </div>
    </button>
  );
}
