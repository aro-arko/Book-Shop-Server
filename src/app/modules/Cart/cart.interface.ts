import { Types } from 'mongoose';

export interface CartItem {
  product: Types.ObjectId; // Reference to the product
  quantity: number; // Quantity of the product
}

export interface Cart {
  user: Types.ObjectId; // Reference to the user
  items: CartItem[]; // Array of cart items
  totalPrice: number; // Total price of the cart
}
