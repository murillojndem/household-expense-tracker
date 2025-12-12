import { ReactNode } from 'react';
import { Nav } from './Nav';
import styles from './Shell.module.css';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className={styles.shell}>
      <Nav />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
