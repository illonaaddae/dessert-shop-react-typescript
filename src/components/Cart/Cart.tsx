import { CartItem } from '../../types/dessert';
import { CartItemComponent } from '../CartItem/CartItem';
import styles from './Cart.module.css';

interface CartProps {
  cart: CartItem[];
  total: number;
  itemCount: number;
  onRemoveItem: (name: string) => void;
  onConfirmOrder: () => void;
}

export const Cart = ({
  cart,
  total,
  itemCount,
  onRemoveItem,
  onConfirmOrder,
}: CartProps) => {
  const isEmpty = cart.length === 0;

  return (
    <aside className={styles.cart}>
      <h2 className={styles.heading}>Your Cart ({itemCount})</h2>

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
                onRemove={() => onRemoveItem(item.name)}
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

          <button className={styles.confirmButton} onClick={onConfirmOrder}>
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
};
