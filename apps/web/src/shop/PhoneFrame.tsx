import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

type Props = {
  children: ReactNode;
  showNotch?: boolean;
};

export default function PhoneFrame({ children, showNotch = false }: Props) {
  return (
    <div className={styles.frame}>
      {showNotch && <div className={styles.notch} aria-hidden />}
      {children}
    </div>
  );
}
