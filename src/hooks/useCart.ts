import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom hook to access cart context
 * This provides a clean API for components to interact with the cart
 * @throws Error if used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);

  // Ensure hook is used within CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
