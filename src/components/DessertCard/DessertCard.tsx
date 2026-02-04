import React from 'react';
import { Dessert } from '../../types/dessert';
import { useCart } from '../../hooks/useCart';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import styles from './DessertCard.module.css';

interface DessertCardProps {
  dessert: Dessert;
  isInCart: boolean;
  quantity?: number;
}

// Wrap component with React.memo for performance optimization
// This prevents re-renders when other dessert cards change
export const DessertCard = React.memo(({
  dessert,
  isInCart,
  quantity = 0,
}: DessertCardProps) => {
  // Access cart operations from context
  const { addToCart, updateQuantity } = useCart();
  
  const { image, name, category, price } = dessert;

  return (
    <article className={styles.card}>
      <div className={`${styles.imageWrapper} ${isInCart ? styles.active : ''}`}>
        {/* Favorite Button */}
        <FavoriteButton dessertName={name} />
        
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          <img 
            src={image.mobile} 
            alt={name} 
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </picture>

        {!isInCart ? (
          <button className={styles.addButton} onClick={() => addToCart(dessert)}>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={() => updateQuantity(name, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => updateQuantity(name, quantity + 1)}
              aria-label="Increase quantity"
            >
              <img src="/assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{category || 'Dessert'}</p>
        <h3 className={styles.name}>{name || 'Unnamed Dessert'}</h3>
        <p className={styles.price}>
          {price ? `$${price.toFixed(2)}` : 'Price unavailable'}
        </p>
      </div>
    </article>
  );
});

// Display name for debugging
DessertCard.displayName = 'DessertCard';
