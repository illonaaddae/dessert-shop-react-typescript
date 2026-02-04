import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  dessertName: string;
}

/**
 * FavoriteButton component for toggling favorites
 * Displays filled heart when favorited, outline when not
 */
export function FavoriteButton({ dessertName }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(dessertName);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    toggleFavorite(dessertName);
  };

  return (
    <button
      className={`${styles.favoriteButton} ${favorited ? styles.favorited : ''}`}
      onClick={handleClick}
      aria-label={favorited ? `Remove ${dessertName} from favorites` : `Add ${dessertName} to favorites`}
      aria-pressed={favorited}
      type="button"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
