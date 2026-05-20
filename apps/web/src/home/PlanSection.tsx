import PlanCard from './PlanCard';
import styles from './PlanSection.module.css';
import SocialCard from './SocialCard';

export default function PlanSection() {
  return (
    <section className={styles.section} aria-label="Your plan">
      <h2 className={styles.heading}>Your plan</h2>
      <div className={styles.grid}>
        <div className={styles.left}>
          <PlanCard
            tone="warm"
            tag="Medium"
            title="Yoga Group"
            date="25 Nov."
            time="14:00–15:00"
            room="A5 room"
            trainerName="Tiffany Way"
          />
        </div>
        <div className={styles.right}>
          <PlanCard
            tone="cool"
            tag="Light"
            title="Balance"
            date="28 Nov."
            time="18:00–19:30"
            room="A2 room"
          />
          <SocialCard />
        </div>
      </div>
    </section>
  );
}
