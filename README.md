# Frontend Mentor - Product List with Cart Solution

This is my solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

![Design preview for the Product list with cart coding challenge](./preview.jpg)

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
- [Installation & Usage](#installation--usage)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- ✅ Add items to the cart and remove them
- ✅ Increase/decrease the number of items in the cart
- ✅ See an order confirmation modal when they click "Confirm Order"
- ✅ Reset their selections when they click "Start New Order"
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Screenshots

**Desktop View - Empty Cart**
![Empty cart state showing dessert products](https://placeholder.com/screenshot1)

**Desktop View - Cart with Items**
![Cart populated with selected desserts](https://placeholder.com/screenshot2)

**Order Confirmation Modal**
![Order confirmation modal showing order summary](https://placeholder.com/screenshot3)

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/product-list-with-cart)
- Live Site URL: [Live Demo](https://your-deployment-url.vercel.app)

## My Process

### Built With

- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped component styling
- **Semantic HTML5** - Accessible markup
- **Flexbox & CSS Grid** - Responsive layouts
- **Mobile-first workflow** - Progressive enhancement

### Project Structure

```
src/
├── components/
│   ├── DessertCard/          # Individual product card component
│   │   ├── DessertCard.tsx
│   │   └── DessertCard.module.css
│   ├── DessertList/          # Product grid/list component
│   ├── Cart/                 # Shopping cart sidebar
│   ├── CartItem/             # Individual cart item component
│   └── OrderConfirmation/    # Order confirmation modal
├── hooks/
│   └── useCart.ts           # Custom hook for cart state management
├── types/
│   ├── dessert.ts           # TypeScript type definitions
│   └── css-modules.d.ts     # CSS module type declarations
├── data/
│   └── desserts.json        # Product data
└── App.tsx                  # Main application component
```

### What I Learned

#### 1. Component Architecture & Reusability

I learned how to break down a complex UI into smaller, reusable components. Each component has a single responsibility:

```tsx
// Example: DessertCard component with TypeScript
interface DessertCardProps {
  dessert: Dessert;
  cartItem?: CartItem;
  onAddToCart: (dessert: Dessert) => void;
  onUpdateQuantity: (name: string, quantity: number) => void;
}

export const DessertCard: React.FC<DessertCardProps> = ({ ... }) => {
  // Component logic
};
```

#### 2. Custom Hooks for State Management

Created a custom `useCart` hook to encapsulate all cart logic:

```typescript
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const addToCart = (dessert: Dessert) => {
    // Add to cart logic
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

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
```

#### 3. TypeScript Benefits

TypeScript caught several potential bugs during development:

```typescript
interface Dessert {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface CartItem extends Dessert {
  quantity: number;
}
```

Benefits I experienced:
- **Autocomplete** - Faster development with IntelliSense
- **Type Safety** - Caught errors at compile time
- **Better Refactoring** - Confidence when making changes
- **Self-Documenting** - Props and data structures are clear

#### 4. CSS Modules for Scoped Styling

Each component has its own CSS module, preventing style conflicts:

```tsx
import styles from './DessertCard.module.css';

<div className={styles.card}>
  <img src={image} className={styles.image} />
</div>
```

### Continued Development

Areas I want to improve in future projects:

- **Performance Optimization**
  - Implement `React.memo` to prevent unnecessary re-renders
  - Use `useMemo` for expensive calculations
  
- **Testing**
  - Add unit tests with Vitest
  - Implement component testing with React Testing Library
  - E2E testing with Playwright
  
- **Accessibility**
  - Add comprehensive ARIA labels
  - Improve keyboard navigation
  - Test with screen readers
  
- **Features**
  - Persist cart to localStorage
  - Add product search and filtering
  - Implement smooth animations with Framer Motion
  - Add product favorites/wishlist

## Installation & Usage

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/product-list-with-cart.git

# Navigate to project directory
cd product-list-with-cart

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub - [@yourusername](https://github.com/yourusername)

---

**Have fun building!** 

