import { DessertList } from './components/DessertList/DessertList';
import { Cart } from './components/Cart/Cart';
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';
import { useCart } from './hooks/useCart';
import desserts from './data/desserts.json';
import styles from './App.module.css';

function App() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    showOrderConfirmation,
    confirmOrder,
  } = useCart();

  return (
    <div className={styles.container}>
      <DessertList
        desserts={desserts}
        cart={cart}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
      />

      <Cart
        cart={cart}
        total={getTotal()}
        itemCount={getItemCount()}
        onRemoveItem={removeFromCart}
        onConfirmOrder={confirmOrder}
      />

      {showOrderConfirmation && (
        <OrderConfirmation
          cart={cart}
          total={getTotal()}
          onStartNewOrder={clearCart}
        />
      )}
    </div>
  );
}

export default App;
