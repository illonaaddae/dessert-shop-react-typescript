import { memo } from 'react';
import { CartItemComponent } from '../CartItem/CartItem';
import { useCart } from '../../hooks/useCart';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import styles from './Cart.module.css';

/**
 * Cart component displaying cart items and order summary
 * Wrapped with React.memo to prevent unnecessary re-renders
 */
export const Cart = memo(function Cart() {
  // Access all cart data and operations from context
  const { cart, getTotal, getItemCount, removeFromCart, confirmOrder } = useCart();

  const total = getTotal();
  const itemCount = getItemCount();
  const isEmpty = cart.length === 0;

  return (
    <aside className={styles.cart}>
      <Typography 
        variant="h2" 
        color="accent" 
        className={styles.heading} 
        aria-live="polite" 
        aria-atomic="true"
      >
        Your Cart ({itemCount})
      </Typography>

      {isEmpty ? (
        <div className={styles.empty}>
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
            className={styles.emptyImage}
          />
          <Typography variant="caption" color="secondary" className={styles.emptyText}>
            Your added items will appear here
          </Typography>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {cart.map((item) => (
              <CartItemComponent
                key={item.name}
                item={item}
                onRemove={() => removeFromCart(item.name)}
              />
            ))}
          </div>

          <div className={styles.totalRow}>
            <Typography variant="body" color="primary" className={styles.totalLabel}>
              Order Total
            </Typography>
            <Typography variant="h3" color="primary" className={styles.totalAmount}>
              ${total.toFixed(2)}
            </Typography>
          </div>

          <div className={styles.carbonNeutral}>
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <Typography variant="caption" color="primary">
              This is a <strong>carbon-neutral</strong> delivery
            </Typography>
          </div>

          <Button variant="primary" onClick={confirmOrder} className={styles.confirmButton}>
            Confirm Order
          </Button>
        </>
      )}
    </aside>
  );
});
