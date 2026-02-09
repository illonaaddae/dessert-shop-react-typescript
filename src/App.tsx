import { DessertList } from './components/DessertList/DessertList';
import { Cart } from './components/Cart/Cart';
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';
import { SkipNav } from './components/SkipNav/SkipNav';
import { useCart } from './hooks/useCart';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import desserts from './data/desserts.json';
import styles from './App.module.css';

function App() {
  // Only need to access showOrderConfirmation from context
  // All other cart operations are handled by individual components
  const { showOrderConfirmation } = useCart();

  // Keyboard shortcuts
  useKeyboardShortcuts(
    [
      {
        key: '/',
        callback: () => {
          // Focus search input
          const searchInput = document.querySelector<HTMLInputElement>('input[type="text"]');
          searchInput?.focus();
        },
        description: 'Focus search',
      },
    ],
    !showOrderConfirmation // Disable when modal is open
  );

  return (
    <>
      <SkipNav />
      <div className={styles.container}>
        <main id="main-content">
          <DessertList desserts={desserts} />
        </main>
        <aside id="cart">
          <Cart />
        </aside>
        {showOrderConfirmation && <OrderConfirmation />}
      </div>
    </>
  );
}

export default App;
