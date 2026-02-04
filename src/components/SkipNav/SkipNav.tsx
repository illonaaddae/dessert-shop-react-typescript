import styles from './SkipNav.module.css';

/**
 * SkipNav component for accessibility
 * Allows keyboard users to skip to main content
 */
export function SkipNav() {
  return (
    <>
      <a href="#main-content" className={styles.skipNav}>
        Skip to main content
      </a>
      <a href="#cart" className={styles.skipNav}>
        Skip to cart
      </a>
    </>
  );
}
