import { memo, useCallback } from 'react';
import { Dessert } from '../../types/dessert';
import { DessertCard } from '../DessertCard/DessertCard';
import { SearchBar } from '../SearchBar/SearchBar';
import { FilterBar } from '../FilterBar/FilterBar';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../context/FavoritesContext';
import { useFilters } from '../../hooks/useFilters';
import styles from './DessertList.module.css';

interface DessertListProps {
  desserts: Dessert[];
}

export const DessertList = memo(function DessertList({ desserts }: DessertListProps) {
  // Access cart from context
  const { cart } = useCart();

  // Access favorites from context
  const { favorites, favoritesCount } = useFavorites();

  // Use filters hook for search and filtering
  const {
    filters,
    filteredDesserts,
    categories,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    toggleFavoritesFilter,
    clearFilters,
    hasActiveFilters,
  } = useFilters(desserts, favorites);

  // Memoize cart item lookup for performance
  const getCartItem = useCallback((dessertName: string) => {
    return cart.find((item) => item.name === dessertName);
  }, [cart]);

  return (
    <section className={styles.section}>
      <Typography variant="h1" color="primary" className={styles.heading}>
        Desserts
      </Typography>

      {/* Search Bar */}
      <SearchBar value={filters.searchQuery} onChange={setSearchQuery} />

      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        selectedCategory={filters.selectedCategory}
        onCategoryChange={setSelectedCategory}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onPriceRangeChange={setPriceRange}
        showFavoritesOnly={filters.showFavoritesOnly}
        onToggleFavorites={toggleFavoritesFilter}
        favoritesCount={favoritesCount}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Results count */}
      <Typography 
        variant="caption" 
        color="secondary" 
        className={styles.resultsCount}
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {filteredDesserts.length} {filteredDesserts.length === 1 ? 'dessert' : 'desserts'} found
      </Typography>

      {/* Dessert Grid */}
      {filteredDesserts.length > 0 ? (
        <div className={styles.grid}>
          {filteredDesserts.map((dessert) => {
            const cartItem = getCartItem(dessert.name);
            return (
              <DessertCard
                key={dessert.name}
                dessert={dessert}
                isInCart={!!cartItem}
                quantity={cartItem?.quantity}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography variant="h2" color="primary" className={styles.emptyHeading}>
            No desserts found
          </Typography>
          <Typography variant="body" color="secondary" className={styles.emptyText}>
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
          {hasActiveFilters && (
            <Button variant="outlined" onClick={clearFilters} className={styles.emptyButton}>
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </section>
  );
});
