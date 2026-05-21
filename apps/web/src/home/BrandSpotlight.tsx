import styles from './BrandSpotlight.module.css';
import { asset } from './asset';
import { notify } from './notify';

type BrandItem = {
  id: string;
  category: string;
  name: string;
  priceKrw: number;
  tone: 'ink' | 'fog' | 'graphite' | 'sand';
  imageSrc: string;
};

const ITEMS: BrandItem[] = [
  {
    id: 'k1',
    category: 'OUTER',
    name: 'Boxy Wool Blazer',
    priceKrw: 389000,
    tone: 'ink',
    imageSrc: asset('images/kin-blazer.jpg'),
  },
  {
    id: 'k2',
    category: 'TOP',
    name: 'Boucle Knit Vest',
    priceKrw: 168000,
    tone: 'fog',
    imageSrc: asset('images/kin-knit-vest.jpg'),
  },
  {
    id: 'k3',
    category: 'BOTTOM',
    name: 'Wide Wool Trouser',
    priceKrw: 215000,
    tone: 'graphite',
    imageSrc: asset('images/kin-trouser.jpg'),
  },
];

const krwFormatter = new Intl.NumberFormat('ko-KR');

const toneClass: Record<BrandItem['tone'], string> = {
  ink: styles.toneInk,
  fog: styles.toneFog,
  graphite: styles.toneGraphite,
  sand: styles.toneSand,
};

export default function BrandSpotlight() {
  return (
    <section className={styles.section} aria-label="Brand of the week">
      <div className={styles.brandHero}>
        <img
          className={styles.brandImage}
          src={asset('images/brand-kin-hero.jpg')}
          alt="KIN brand visual — minimal tailoring moodshot"
          loading="lazy"
        />
        <div className={styles.brandOverlay} aria-hidden="true" />
        <div className={styles.brandMeta}>
          <span className={styles.eyebrow}>BRAND OF THE WEEK</span>
          <h3 className={styles.brandName}>KIN</h3>
          <p className={styles.brandDesc}>절제된 실루엣과 조용한 디테일. 서울 베이스 컨템포러리.</p>
          <button
            type="button"
            className={styles.brandCta}
            onClick={() => notify('KIN 브랜드 페이지 — 준비 중')}
          >
            브랜드 보기
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div className={styles.carouselWrap}>
        <ul className={styles.carousel}>
          {ITEMS.map((item) => (
            <li key={item.id} className={styles.item}>
              <img
                className={`${styles.itemImage} ${toneClass[item.tone]}`}
                src={item.imageSrc}
                alt={`KIN ${item.name}`}
                width={140}
                height={175}
                loading="lazy"
              />
              <div className={styles.itemMeta}>
                <span className={styles.itemCategory}>{item.category}</span>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>{krwFormatter.format(item.priceKrw)}원</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
