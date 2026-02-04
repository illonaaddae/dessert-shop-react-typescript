import { memo } from 'react';
import { CartItemComponent } from '../CartItem/CartItem';
import { useCart } from '../../hooks/useCart';
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
      <h2 className={styles.heading} aria-live="polite" aria-atomic="true">
        Your Cart ({itemCount})
      </h2>

      {isEmpty ? (
        <div className={styles.empty}>
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>Your added items will appear here</p>
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
            <span className={styles.totalLabel}>Order Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>

          <div className={styles.carbonNeutral}>
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button className={styles.confirmButton} onClick={confirmOrder}>
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
});
