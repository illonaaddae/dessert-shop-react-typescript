import { useState, useCallback } from 'react';
import { Dessert, CartItem } from '../types/dessert';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const addToCart = useCallback((dessert: Dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === dessert.name);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === dessert.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...dessert, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  }, []);

  const updateQuantity = useCallback((name: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(name);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setShowOrderConfirmation(false);
  }, []);

  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const getItemCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const confirmOrder = useCallback(() => {
    setShowOrderConfirmation(true);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    showOrderConfirmation,
    confirmOrder,
  };
};
