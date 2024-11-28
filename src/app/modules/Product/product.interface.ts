// Defines possible categories for books
type BookCategory =
  | 'Fiction'
  | 'Science'
  | 'SelfDevelopment'
  | 'Poetry'
  | 'Religious';

// Type definition for a book object
export type TBook = {
  title: string;
  author: string;
  price: number;
  category: BookCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
