import BottomNav from './BottomNav';
import BrandSpotlight from './BrandSpotlight';
import CategoryChips from './CategoryChips';
import EditorialCard from './EditorialCard';
import Header from './Header';
import HeroBanner from './HeroBanner';
import styles from './HomeScreen.module.css';
import type { Product } from './ProductCard';
import ProductGrid from './ProductGrid';
import SectionHeader from './SectionHeader';
import Toast from './Toast';
import { asset } from './asset';

const EDITOR_PICKS: Product[] = [
  {
    id: 'p1',
    brand: 'OURS',
    name: 'Cashmere Crewneck Knit',
    priceKrw: 248000,
    tone: 'sand',
    imageSrc: asset('images/product-cashmere-knit.jpg'),
    badge: 'NEW',
  },
  {
    id: 'p2',
    brand: 'MARGE',
    name: 'Pleated Wool Slacks',
    priceKrw: 189000,
    tone: 'graphite',
    imageSrc: asset('images/product-wool-slacks.jpg'),
  },
  {
    id: 'p3',
    brand: 'NORM',
    name: 'Overdyed Card Holder',
    priceKrw: 68000,
    tone: 'clay',
    imageSrc: asset('images/product-card-holder.jpg'),
    badge: 'SALE',
  },
  {
    id: 'p4',
    brand: 'OURS',
    name: 'Soft Leather Derby',
    priceKrw: 329000,
    tone: 'ink',
    imageSrc: asset('images/product-leather-derby.jpg'),
    badge: 'RESTOCK',
  },
];

export default function HomeScreen() {
  return (
    <section className={styles.screen} aria-label="홈">
      <Header />
      <div className={styles.body}>
        <HeroBanner
          edition="12"
          title="Quiet Tailoring"
          caption="이번 주, 절제된 실루엣과 매트한 마감으로 완성한 14벌."
        />
        <CategoryChips />
        <section className={styles.section} aria-label="에디터 픽">
          <SectionHeader eyebrow="THIS WEEK" title="EDITOR'S PICK" trailing="MORE" />
          <ProductGrid products={EDITOR_PICKS} />
        </section>
        <BrandSpotlight />
        <section className={styles.section} aria-label="스타일 노트">
          <SectionHeader eyebrow="STYLE NOTE" title="Layering, Quietly" trailing="READ" />
          <EditorialCard
            eyebrow="JOURNAL · 04"
            title="가을의 레이어링은 소리내지 않는다"
            excerpt="얇은 메리노, 중간 두께 셔츠, 단정한 블레이저. 세 겹으로 만든 침묵의 무드."
            readTime="4분 읽기"
          />
        </section>
      </div>
      <BottomNav />
      <Toast />
    </section>
  );
}
