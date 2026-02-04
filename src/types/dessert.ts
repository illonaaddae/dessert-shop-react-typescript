export interface DessertImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  image: DessertImage;
  name: string;
  category: string;
  price: number;
}

export interface CartItem extends Dessert {
  quantity: number;
}

// Cart Action Types for useReducer
export enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  CONFIRM_ORDER = 'CONFIRM_ORDER',
  LOAD_CART = 'LOAD_CART',
}

// Cart Actions
export type CartAction =
  | { type: CartActionType.ADD_ITEM; payload: Dessert }
  | { type: CartActionType.REMOVE_ITEM; payload: string }
  | { type: CartActionType.UPDATE_QUANTITY; payload: { name: string; quantity: number } }
  | { type: CartActionType.CLEAR_CART }
  | { type: CartActionType.CONFIRM_ORDER }
  | { type: CartActionType.LOAD_CART; payload: CartItem[] };

// Cart State
export interface CartState {
  items: CartItem[];
  showOrderConfirmation: boolean;
}
