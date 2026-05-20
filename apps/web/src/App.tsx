import styles from './App.module.css';
import LandingPage from './landing/LandingPage';
import { useRoute } from './shared/routing';
import Header from './shell/Header';
import ShowcasePage from './showcase/ShowcasePage';

export default function App() {
  const [route, navigate] = useRoute();
  const activeSection = route.name === 'showcase' ? 'showcase' : 'landing';

  return (
    <div className={styles.page}>
      <Header active={activeSection} onNavigate={navigate} />
      <main className={styles.main}>
        {route.name === 'showcase' ? (
          <ShowcasePage selectedSlug={route.exampleSlug} onNavigate={navigate} />
        ) : (
          <LandingPage onNavigate={navigate} />
        )}
      </main>
    </div>
  );
}
