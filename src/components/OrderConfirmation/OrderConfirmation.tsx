import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import styles from './OrderConfirmation.module.css';

export const OrderConfirmation: React.FC = () => {
  // Access cart data and operations from context
  const { cart, getTotal, clearCart } = useCart();
  const total = getTotal();

  // Focus trap for modal accessibility
  const modalRef = useFocusTrap({
    isActive: true,
    onEscape: clearCart,
  });

  return (
    <div 
      className={styles.overlay} 
      onClick={clearCart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirmed-heading"
    >
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        ref={modalRef as React.RefObject<HTMLDivElement>}
      >
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          className={styles.icon}
        />
        <Typography variant="h2" color="primary" className={styles.heading} id="order-confirmed-heading">
          Order Confirmed
        </Typography>
        <Typography variant="caption" color="secondary" className={styles.message}>
          We hope you enjoy your food!
        </Typography>

        <div className={styles.orderSummary}>
          {cart.map((item) => (
            <div key={item.name} className={styles.item}>
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className={styles.thumbnail}
              />
              <div className={styles.itemInfo}>
                <Typography variant="h4" color="primary" className={styles.itemName}>
                  {item.name}
                </Typography>
                <div className={styles.itemDetails}>
                  <Typography variant="caption" color="accent" weight="semibold" className={styles.quantity}>
                    {item.quantity}x
                  </Typography>
                  <Typography variant="caption" color="secondary" className={styles.unitPrice}>
                    @ ${item.price.toFixed(2)}
                  </Typography>
                </div>
              </div>
              <Typography variant="body" color="primary" weight="semibold" className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </div>
          ))}

          <div className={styles.totalRow}>
            <Typography variant="body" color="primary" className={styles.totalLabel}>
              Order Total
            </Typography>
            <Typography variant="h3" color="primary" className={styles.totalAmount}>
              ${total.toFixed(2)}
            </Typography>
          </div>
        </div>

        <Button variant="primary" onClick={clearCart} className={styles.newOrderButton}>
          Start New Order
        </Button>
      </div>
    </div>
  );
};
