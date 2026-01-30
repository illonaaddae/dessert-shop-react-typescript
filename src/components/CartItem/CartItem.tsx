import { CartItem } from '../../types/dessert';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
}

export const CartItemComponent = ({ item, onRemove }: CartItemProps) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.name}</h4>
        <div className={styles.details}>
          <span className={styles.quantity}>{item.quantity}x</span>
          <span className={styles.unitPrice}>@ ${item.price.toFixed(2)}</span>
          <span className={styles.total}>${itemTotal.toFixed(2)}</span>
        </div>
      </div>
      <button
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${item.name} from cart`}
      >
        <img src="/assets/images/icon-remove-item.svg" alt="" />
      </button>
    </div>
  );
};

