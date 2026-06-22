import type { ReactNode } from 'react';
import styles from './landing.module.css';

type CrystalFrameProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'form';
};

export function CrystalFrame({
  children,
  className,
  as: Tag = 'div',
}: CrystalFrameProps) {
  return (
    <Tag className={`${styles.crystalFrame} ${className ?? ''}`}>
      <span className={styles.crystalFrameAccent} aria-hidden="true" />
      {children}
    </Tag>
  );
}

export function CrystalCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.crystalCard} ${className ?? ''}`}>
      <span className={styles.crystalCardAccent} aria-hidden="true" />
      {children}
    </div>
  );
}

export function CrystalSection({
  children,
  className,
  id,
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      className={`${styles.crystalSection} ${className ?? ''}`}
      aria-labelledby={ariaLabelledby}
    >
      <div className={styles.crystalSectionInner}>{children}</div>
    </section>
  );
}
