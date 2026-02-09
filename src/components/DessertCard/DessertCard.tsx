import React from 'react';
import { Dessert } from '../../types/dessert';
import { useCart } from '../../hooks/useCart';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
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
          <Button
            variant="outlined"
            onClick={() => addToCart(dessert)}
            className={styles.addButton}
            icon={<img src="/assets/images/icon-add-to-cart.svg" alt="" />}
          >
            Add to Cart
          </Button>
        ) : (
          <div className={styles.quantityControls}>
            <Button
              variant="icon"
              onClick={() => updateQuantity(name, quantity - 1)}
              ariaLabel="Decrease quantity"
              icon={<img src="/assets/images/icon-decrement-quantity.svg" alt="" />}
            />
            <Typography variant="body" color="inherit" className={styles.quantity}>
              {quantity}
            </Typography>
            <Button
              variant="icon"
              onClick={() => updateQuantity(name, quantity + 1)}
              ariaLabel="Increase quantity"
              icon={<img src="/assets/images/icon-increment-quantity.svg" alt="" />}
            />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <Typography variant="caption" color="secondary" className={styles.category}>
          {category || 'Dessert'}
        </Typography>
        <Typography variant="h3" color="primary" className={styles.name}>
          {name || 'Unnamed Dessert'}
        </Typography>
        <Typography variant="price" color="accent" className={styles.price}>
          {price ? `$${price.toFixed(2)}` : 'Price unavailable'}
        </Typography>
      </div>
    </article>
  );
});

// Display name for debugging
DessertCard.displayName = 'DessertCard';
