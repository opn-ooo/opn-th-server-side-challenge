import { IProduct } from './product.interface';

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description?: string
  ) {}

  // Mock products for testing
  static getMockProducts(): IProduct[] {
    return [
      { id: 1, name: 'Premium T-Shirt', price: 1000, description: 'High quality cotton t-shirt' },
      { id: 2, name: 'Free Socks', price: 0, description: 'Complimentary socks' },
      { id: 3, name: 'Jeans', price: 1500, description: 'Classic blue jeans' },
      { id: 4, name: 'Sneakers', price: 2000, description: 'Comfortable sneakers' },
      { id: 5, name: 'Hoodie', price: 1200, description: 'Warm hoodie' },
      { id: 10, name: 'Free Hat', price: 0, description: 'Complimentary hat' },
    ];
  }

  static findById(id: number): IProduct | undefined {
    return this.getMockProducts().find(product => product.id === id);
  }
} 