import React from 'react';
import { CartItem } from '../../types/dessert';
import styles from './OrderConfirmation.module.css';

interface OrderConfirmationProps {
  cart: CartItem[];
  total: number;
  onStartNewOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  cart,
  total,
  onStartNewOrder,
}) => {
  return (
    <div className={styles.overlay} onClick={onStartNewOrder}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>Order Confirmed</h2>
        <p className={styles.message}>We hope you enjoy your food!</p>

        <div className={styles.orderSummary}>
          {cart.map((item) => (
            <div key={item.name} className={styles.item}>
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className={styles.thumbnail}
              />
              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <div className={styles.itemDetails}>
                  <span className={styles.quantity}>{item.quantity}x</span>
                  <span className={styles.unitPrice}>
                    @ ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <span className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Order Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
        </div>

        <button className={styles.newOrderButton} onClick={onStartNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
};
