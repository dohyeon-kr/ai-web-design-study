import styles from './App.module.css';
import HomeScreen from './home/HomeScreen';

export default function App() {
  return (
    <div className={styles.page}>
      <HomeScreen />
    </div>
  );
}
