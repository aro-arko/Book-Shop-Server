import { ObjectId } from 'mongoose';

// Defining type for Order object
export type TOrder = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
};
