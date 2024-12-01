export type Product = {
  name: string;
  brand: string;
  price: number;
  category:
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted?: boolean;

};
