import { createContext, useReducer, useMemo, useCallback, useEffect, ReactNode } from 'react';
import { Dessert, CartItem, CartState, CartAction, CartActionType } from '../types/dessert';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Define the shape of our context
interface CartContextType {
  cart: CartItem[];
  showOrderConfirmation: boolean;
  addToCart: (dessert: Dessert) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  confirmOrder: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Create the context with undefined as initial value
// We'll provide the actual value in the provider
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Reducer Function
// This centralizes all cart state logic in one place
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const dessert = action.payload;
      const existingItem = state.items.find((item) => item.name === dessert.name);

      if (existingItem) {
        // If item exists, increment quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.name === dessert.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // If item doesn't exist, add it with quantity 1
      return {
        ...state,
        items: [...state.items, { ...dessert, quantity: 1 }],
      };
    }

    case CartActionType.REMOVE_ITEM:
      // Filter out the item with the matching name
      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload),
      };

    case CartActionType.UPDATE_QUANTITY: {
      const { name, quantity } = action.payload;

      // If quantity is 0 or less, remove the item
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.name !== name),
        };
      }

      // Otherwise, update the quantity
      return {
        ...state,
        items: state.items.map((item) =>
          item.name === name ? { ...item, quantity } : item
        ),
      };
    }

    case CartActionType.CLEAR_CART:
      // Reset cart to empty state
      return {
        items: [],
        showOrderConfirmation: false,
      };

    case CartActionType.CONFIRM_ORDER:
      // Show the order confirmation modal
      return {
        ...state,
        showOrderConfirmation: true,
      };

    case CartActionType.LOAD_CART:
      // Load cart items from localStorage
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

// Initial state for the cart
const initialState: CartState = {
  items: [],
  showOrderConfirmation: false,
};

// CartProvider Component
// This wraps our app and provides cart state to all children
export function CartProvider({ children }: { children: ReactNode }) {
  // Use localStorage to persist cart items
  const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>('dessert-cart', []);

  // Use reducer for complex state management
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (storedCart.length > 0) {
      dispatch({ type: CartActionType.LOAD_CART, payload: storedCart });
    }
  }, []); // Only run once on mount

  // Sync cart items to localStorage whenever they change
  useEffect(() => {
    setStoredCart(state.items);
  }, [state.items, setStoredCart]);

  // Action creators wrapped in useCallback for performance
  // These functions won't be recreated on every render
  const addToCart = useCallback((dessert: Dessert) => {
    dispatch({ type: CartActionType.ADD_ITEM, payload: dessert });
  }, []);

  const removeFromCart = useCallback((name: string) => {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: name });
  }, []);

  const updateQuantity = useCallback((name: string, quantity: number) => {
    dispatch({ type: CartActionType.UPDATE_QUANTITY, payload: { name, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CartActionType.CLEAR_CART });
  }, []);

  const confirmOrder = useCallback(() => {
    dispatch({ type: CartActionType.CONFIRM_ORDER });
  }, []);

  // Memoized computed values
  // These only recalculate when cart items change
  const getTotal = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  const getItemCount = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cart: state.items,
      showOrderConfirmation: state.showOrderConfirmation,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      confirmOrder,
      getTotal,
      getItemCount,
    }),
    [
      state.items,
      state.showOrderConfirmation,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      confirmOrder,
      getTotal,
      getItemCount,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
