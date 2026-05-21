import AppHeader from './AppHeader';
import BottomNavigation from './BottomNavigation';
import HeroSection from './HeroSection';
import styles from './HomePage.module.css';
import NewFeatureBanner from './NewFeatureBanner';
import OnboardingShortcut from './OnboardingShortcut';
import PromotionCarousel from './PromotionCarousel';
import RankingPreview from './RankingPreview';
import TaskGrid from './TaskGrid';

export default function HomePage() {
  return (
    <section className={styles.frame} aria-label="포인트팡 홈">
      <div className={styles.scroll}>
        <AppHeader />
        <HeroSection />
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3 className={styles.sectionTitle}>오늘의 미션</h3>
            <button type="button" className={styles.sectionMore}>
              전체보기
            </button>
          </div>
          <TaskGrid />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h3 className={styles.sectionTitle}>꿀팁 프로모션</h3>
            <button type="button" className={styles.sectionMore}>
              더보기
            </button>
          </div>
          <PromotionCarousel />
        </div>
        <div className={styles.section}>
          <NewFeatureBanner />
        </div>
        <div className={styles.section}>
          <RankingPreview />
        </div>
        <div className={styles.section}>
          <OnboardingShortcut />
        </div>
      </div>
      <BottomNavigation />
    </section>
  );
}
