import styles from './DetailScreen.module.css';
import FruitArt from './FruitArt';
import { BackIcon, BagIcon, ChevronRightIcon, HeartIcon, PlusIcon, StarIcon } from './icons';
import type { Product, SizeKey } from './types';
import { SIZE_MULTIPLIER } from './types';

const SIZES: SizeKey[] = ['500g', '1kg', '1.5kg'];

type Props = {
  product: Product;
  selectedSize: SizeKey;
  isFavorite: boolean;
  onBack: () => void;
  onSelectSize: (s: SizeKey) => void;
  onToggleFavorite: () => void;
  onQuickAdd: () => void;
  onPay: () => void;
};

export default function DetailScreen({
  product,
  selectedSize,
  isFavorite,
  onBack,
  onSelectSize,
  onToggleFavorite,
  onQuickAdd,
  onPay,
}: Props) {
  const totalPrice = Math.round(product.pricePerKg * SIZE_MULTIPLIER[selectedSize]);

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Back">
          <BackIcon width={22} height={22} />
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.iconWhite}`}
          data-on={isFavorite}
          onClick={onToggleFavorite}
          aria-label="Toggle favorite"
        >
          <HeartIcon filled={isFavorite} width={22} height={22} />
        </button>
      </div>

      <div className={styles.heroWrap}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroFruit}>
          <FruitArt src={product.imageSrc} alt={product.imageAlt} />
        </div>
        <button
          type="button"
          className={styles.fab}
          onClick={onQuickAdd}
          aria-label="Quick add 500g"
        >
          <PlusIcon width={20} height={20} />
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.price}>
            <span className={styles.priceUnit}>Rs.</span>
            <span className={styles.priceMain}>{totalPrice}</span>
            <span className={styles.priceUnit}>/{selectedSize}</span>
          </span>
        </div>

        <div className={styles.rating}>
          <span className={styles.star}>
            <StarIcon width={16} height={16} />
          </span>
          {product.rating.toFixed(1)}
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.sizeRow}>
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              className={styles.sizePill}
              data-active={s === selectedSize}
              onClick={() => onSelectSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actionRow}>
        <button
          type="button"
          className={styles.cartButton}
          onClick={onQuickAdd}
          aria-label="Add to cart"
        >
          <BagIcon width={22} height={22} />
        </button>
        <button type="button" className={styles.payButton} onClick={onPay}>
          PAY NOW
          <ChevronRightIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
