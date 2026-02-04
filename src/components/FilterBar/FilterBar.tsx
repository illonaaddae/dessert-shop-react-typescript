import { memo } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceRangeChange: (min: number, max: number) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

/**
 * FilterBar component for category and price filtering
 * Provides category buttons and price range inputs
 * Wrapped with React.memo to prevent unnecessary re-renders
 */
export const FilterBar = memo(function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceRangeChange,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onPriceRangeChange(value, maxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 100;
    onPriceRangeChange(minPrice, value);
  };

  return (
    <div className={styles.filterBar}>
      {/* Favorites Filter */}
      <div className={styles.filterSection}>
        <button
          className={`${styles.favoritesToggle} ${showFavoritesOnly ? styles.active : ''}`}
          onClick={onToggleFavorites}
          aria-pressed={showFavoritesOnly}
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={showFavoritesOnly ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Favorites Only</span>
          {favoritesCount > 0 && (
            <span className={styles.favoritesCount}>{favoritesCount}</span>
          )}
        </button>
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Category</label>
        <div className={styles.categoryButtons} role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => onCategoryChange(category)}
              aria-pressed={selectedCategory === category}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Price Range</label>
        <div className={styles.priceRange}>
          <div className={styles.priceInput}>
            <label htmlFor="minPrice" className={styles.priceInputLabel}>
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              className={styles.priceInputField}
              value={minPrice}
              onChange={handleMinPriceChange}
              min="0"
              step="0.5"
              aria-label="Minimum price"
            />
          </div>
          <div className={styles.priceInput}>
            <label htmlFor="maxPrice" className={styles.priceInputLabel}>
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              className={styles.priceInputField}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              min="0"
              step="0.5"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className={styles.filterActions}>
          <button
            className={styles.clearButton}
            onClick={onClearFilters}
            type="button"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
});
