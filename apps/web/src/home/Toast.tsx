import { useEffect, useRef, useState } from 'react';
import styles from './Toast.module.css';

type ToastEvent = CustomEvent<{ message: string }>;

export default function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    function handler(event: Event) {
      const detail = (event as ToastEvent).detail;
      setMessage(detail.message);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setMessage(null), 1800);
    }
    window.addEventListener('app:toast', handler);
    return () => {
      window.removeEventListener('app:toast', handler);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!message) return null;
  return (
    // biome-ignore lint/a11y/useSemanticElements: toast is a transient status banner, not a form output
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
}
