import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: string[]; // Array of dessert names
  toggleFavorite: (dessertName: string) => void;
  isFavorite: (dessertName: string) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

/**
 * FavoritesProvider manages the favorites/wishlist state
 * Persists favorites to localStorage
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('dessert-favorites', []);

  // Toggle favorite status for a dessert
  const toggleFavorite = useCallback(
    (dessertName: string) => {
      setFavorites((prev) => {
        if (prev.includes(dessertName)) {
          // Remove from favorites
          return prev.filter((name) => name !== dessertName);
        } else {
          // Add to favorites
          return [...prev, dessertName];
        }
      });
    },
    [setFavorites]
  );

  // Check if a dessert is favorited
  const isFavorite = useCallback(
    (dessertName: string) => {
      return favorites.includes(dessertName);
    },
    [favorites]
  );

  // Memoize favorites count
  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount,
    }),
    [favorites, toggleFavorite, isFavorite, favoritesCount]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

/**
 * Hook to access favorites context
 * Must be used within FavoritesProvider
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
