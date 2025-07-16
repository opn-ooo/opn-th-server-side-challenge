import { IProduct } from '../product/product.interface';

export interface ICartItem {
  productId: number;
  quantity: number;
  product?: IProduct; // Optional for performance, can be loaded when needed
}

export interface ICart {
  id: string;
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
  uniqueItemsCount: number;
} 