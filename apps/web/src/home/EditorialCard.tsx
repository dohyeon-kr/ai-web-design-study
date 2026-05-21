import styles from './EditorialCard.module.css';
import { asset } from './asset';

type EditorialCardProps = {
  eyebrow: string;
  title: string;
  excerpt: string;
  readTime: string;
};

export default function EditorialCard({ eyebrow, title, excerpt, readTime }: EditorialCardProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={asset('images/editorial-layering.jpg')}
        alt="Style note editorial moodshot"
        loading="lazy"
      />
      <div className={styles.body}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <span className={styles.readTime}>{readTime}</span>
      </div>
    </article>
  );
}
