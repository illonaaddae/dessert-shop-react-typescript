import React from 'react';
import { CartItem } from '../../types/dessert';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
}

// Wrap component with React.memo for performance optimization
// This prevents re-renders when other cart items change
export const CartItemComponent = React.memo(({ item, onRemove }: CartItemProps) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <Typography variant="h4" color="primary" className={styles.name}>
          {item.name}
        </Typography>
        <div className={styles.details}>
          <Typography variant="caption" color="accent" weight="semibold" className={styles.quantity}>
            {item.quantity}x
          </Typography>
          <Typography variant="caption" color="secondary" className={styles.unitPrice}>
            @ ${item.price.toFixed(2)}
          </Typography>
          <Typography variant="caption" color="primary" weight="semibold" className={styles.total}>
            ${itemTotal.toFixed(2)}
          </Typography>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={onRemove}
        ariaLabel={`Remove ${item.name} from cart`}
        icon={<img src="/assets/images/icon-remove-item.svg" alt="" />}
      />
    </div>
  );
});

// Display name for debugging
CartItemComponent.displayName = 'CartItemComponent';
