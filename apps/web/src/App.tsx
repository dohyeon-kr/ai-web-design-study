import { useCallback, useState } from 'react';
import styles from './App.module.css';
import DetailScreen from './shop/DetailScreen';
import HomeScreen from './shop/HomeScreen';
import PhoneFrame from './shop/PhoneFrame';
import { findProduct, PRODUCTS } from './shop/data';
import type { SizeKey } from './shop/types';
import { SIZE_MULTIPLIER } from './shop/types';

type ActiveDetail = string | null;

export default function App() {
  const [detailId, setDetailId] = useState<ActiveDetail>(PRODUCTS[0]?.id ?? null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set([PRODUCTS[0].id]));
  const [cartItems, setCartItems] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<SizeKey>('500g');

  const detailProduct = detailId ? findProduct(detailId) : undefined;

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addOne = useCallback((_id: string) => {
    setCartItems((c) => c + 1);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.brand}>
        <span className={styles.brandDot} aria-hidden />
        Tanveer Fresh
      </div>

      <div className={styles.stage}>
        <PhoneFrame>
          <HomeScreen
            cartCount={cartItems}
            favorites={favorites}
            cardSize={selectedSize}
            onOpenProduct={(id) => setDetailId(id)}
            onToggleFavorite={toggleFavorite}
            onAdd={addOne}
          />
        </PhoneFrame>

        {detailProduct && (
          <PhoneFrame>
            <DetailScreen
              product={detailProduct}
              selectedSize={selectedSize}
              isFavorite={favorites.has(detailProduct.id)}
              onBack={() => setDetailId(null)}
              onSelectSize={setSelectedSize}
              onToggleFavorite={() => toggleFavorite(detailProduct.id)}
              onQuickAdd={() => addOne(detailProduct.id)}
              onPay={() => {
                addOne(detailProduct.id);
                const qty = SIZE_MULTIPLIER[selectedSize];
                window.alert(
                  `Charging Rs.${Math.round(detailProduct.pricePerKg * qty)} for ${selectedSize} of ${detailProduct.subtitle}.`,
                );
              }}
            />
          </PhoneFrame>
        )}
      </div>

      <div className={styles.tag}>Tanveer Fresh · Designed in pure CSS</div>
    </div>
  );
}
