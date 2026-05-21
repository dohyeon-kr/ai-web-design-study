import styles from './App.module.css';
import HomePage from './home/HomePage';

export default function App() {
  return (
    <div className={styles.page}>
      <HomePage />
    </div>
  );
}
