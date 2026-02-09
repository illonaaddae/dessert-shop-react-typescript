import { useState, useMemo, useCallback } from 'react';
import { Dessert } from '../types/dessert';

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  showFavoritesOnly: boolean;
}

/**
 * Custom hook for managing search and filter state
 * @param desserts - Array of all desserts
 * @param favorites - Array of favorited dessert names
 * @returns Filtered desserts and filter control functions
 */
export function useFilters(desserts: Dessert[], favorites: string[] = []) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    minPrice: 0,
    maxPrice: 100,
    showFavoritesOnly: false,
  });

  // Get unique categories from desserts
  const categories = useMemo(() => {
    const uniqueCategories = new Set(desserts.map((d) => d.category));
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [desserts]);

  // Filter desserts based on all active filters
  const filteredDesserts = useMemo(() => {
    return desserts.filter((dessert) => {
      // Search filter - check name and category
      const matchesSearch =
        filters.searchQuery === '' ||
        dessert.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        dessert.category.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.selectedCategory === 'All' || dessert.category === filters.selectedCategory;

      // Price filter
      const matchesPrice = dessert.price >= filters.minPrice && dessert.price <= filters.maxPrice;

      // Favorites filter
      const matchesFavorites = !filters.showFavoritesOnly || favorites.includes(dessert.name);

      return matchesSearch && matchesCategory && matchesPrice && matchesFavorites;
    });
  }, [desserts, filters, favorites]);

  // Update search query
  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // Update selected category
  const setSelectedCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  // Update price range
  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  // Toggle favorites filter
  const toggleFavoritesFilter = useCallback(() => {
    setFilters((prev) => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'All',
      minPrice: 0,
      maxPrice: 100,
      showFavoritesOnly: false,
    });
  }, []);

  return {
    filters,
    filteredDesserts,
    categories,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    toggleFavoritesFilter,
    clearFilters,
    hasActiveFilters:
      filters.searchQuery !== '' ||
      filters.selectedCategory !== 'All' ||
      filters.minPrice > 0 ||
      filters.maxPrice < 100 ||
      filters.showFavoritesOnly,
  };
}
