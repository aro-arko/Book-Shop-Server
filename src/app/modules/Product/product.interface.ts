// Defines possible categories for books
export type ProductCategory =
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
  image: string;
  quantity: number;
  inStock: boolean;
};
