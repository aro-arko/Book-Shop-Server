type BookCategory =
  | 'Fiction'
  | 'Science'
  | 'SelfDevelopment'
  | 'Poetry'
  | 'Religious';
export type TBook = {
  title: string;
  author: string;
  price: number;
  category: BookCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
