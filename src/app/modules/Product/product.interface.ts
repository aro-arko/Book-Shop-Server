// Defines possible categories for books
type ProductCategory =
  | 'Fiction'
  | 'Science'
  | 'SelfDevelopment'
  | 'Poetry'
  | 'Religious';

// Type definition for a book object
export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
