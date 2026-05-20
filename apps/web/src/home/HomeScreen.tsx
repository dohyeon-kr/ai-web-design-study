import BottomNav from './BottomNav';
import DailyChallengeCard from './DailyChallengeCard';
import Header from './Header';
import styles from './HomeScreen.module.css';
import PlanSection from './PlanSection';
import WeekStrip from './WeekStrip';

export default function HomeScreen() {
  return (
    <section className={styles.screen} aria-label="Home">
      <div className={styles.body}>
        <Header userName="Sandra" dateLabel="Today 25 Nov." />
        <DailyChallengeCard
          title="Daily challenge"
          due="Do your plan before 09:00 AM"
          extraCount={4}
        />
        <WeekStrip selectedDate={25} />
        <PlanSection />
      </div>
      <BottomNav />
    </section>
  );
}
