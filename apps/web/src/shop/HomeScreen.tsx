import { useMemo, useState } from 'react';
import BottomNav from './BottomNav';
import { CATEGORIES, PRODUCTS } from './data';
import { MenuIcon, MicIcon, SearchIcon } from './icons';
import ProductCard from './ProductCard';
import styles from './HomeScreen.module.css';
import type { CategoryKey, Product, SizeKey } from './types';

type Props = {
  cartCount: number;
  favorites: Set<string>;
  cardSize: SizeKey;
  onOpenProduct: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAdd: (id: string) => void;
};

export default function HomeScreen({
  cartCount,
  favorites,
  cardSize,
  onOpenProduct,
  onToggleFavorite,
  onAdd,
}: Props) {
  const [category, setCategory] = useState<CategoryKey>('fruits');
  const [query, setQuery] = useState('');
  const [navTab, setNavTab] = useState<'home' | 'offers' | 'alerts' | 'profile'>('home');

  const filtered: Product[] = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === category).filter((p) =>
      query.trim()
        ? `${p.name} ${p.subtitle}`.toLowerCase().includes(query.trim().toLowerCase())
        : true,
    );
  }, [category, query]);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <span className={styles.greetingHello}>Hello</span>
          <span className={styles.greetingName}>Tanveer</span>
        </div>
        <button type="button" className={styles.menuButton} aria-label="Menu">
          <MenuIcon width={22} height={22} />
        </button>
      </header>

      <div className={styles.searchRow}>
        <label className={styles.searchField}>
          <span className={styles.searchIcon}>
            <SearchIcon width={18} height={18} />
          </span>
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </label>
        <button type="button" className={styles.micButton} aria-label="Voice search">
          <MicIcon width={20} height={20} />
        </button>
      </div>

      <div className={styles.categoryScroll}>
        {CATEGORIES.map((cat, i) => {
          const active = cat.key === category;
          return (
            <button
              key={cat.key}
              type="button"
              className={`${styles.chip} ${active ? styles.chipActive : ''} ${styles.staggerItem}`}
              data-tone={cat.tone}
              style={{ animationDelay: `${80 + i * 60}ms` }}
              onClick={() => setCategory(cat.key)}
            >
              <span className={styles.chipEmoji} aria-hidden>
                {cat.emoji}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className={styles.productScroll}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No matches in this category.</div>
        ) : (
          filtered.map((p, i) => (
            <div
              key={p.id}
              className={styles.staggerItem}
              style={{ animationDelay: `${180 + i * 90}ms` }}
            >
              <ProductCard
                product={p}
                selectedSize={cardSize}
                isFavorite={favorites.has(p.id)}
                onOpen={() => onOpenProduct(p.id)}
                onToggleFavorite={() => onToggleFavorite(p.id)}
                onAdd={() => onAdd(p.id)}
              />
            </div>
          ))
        )}
      </div>

      <div className={styles.navHolder}>
        <BottomNav active={navTab} cartCount={cartCount} onChange={setNavTab} />
      </div>
    </div>
  );
}
