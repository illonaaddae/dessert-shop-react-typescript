import { Dessert, CartItem } from '../../types/dessert';
import { DessertCard } from '../DessertCard/DessertCard';
import styles from './DessertList.module.css';

interface DessertListProps {
  desserts: Dessert[];
  cart: CartItem[];
  onAddToCart: (dessert: Dessert) => void;
  onUpdateQuantity: (name: string, quantity: number) => void;
}

export const DessertList = ({
  desserts,
  cart,
  onAddToCart,
  onUpdateQuantity,
}: DessertListProps) => {
  const getCartItem = (dessertName: string) => {
    return cart.find((item) => item.name === dessertName);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Desserts</h1>
      <div className={styles.grid}>
        {desserts.map((dessert) => {
          const cartItem = getCartItem(dessert.name);
          return (
            <DessertCard
              key={dessert.name}
              dessert={dessert}
              isInCart={!!cartItem}
              quantity={cartItem?.quantity}
              onAddToCart={() => onAddToCart(dessert)}
              onUpdateQuantity={(qty) => onUpdateQuantity(dessert.name, qty)}
            />
          );
        })}
      </div>
    </section>
  );
};
