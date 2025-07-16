import { ICart, ICartItem } from './cart.interface';
import { Product } from '../product/product.model';

export class Cart implements ICart {
  public id: string;
  public items: ICartItem[] = [];
  public totalAmount: number = 0;
  public totalItems: number = 0;
  public uniqueItemsCount: number = 0;

  constructor(id?: string) {
    this.id = id || this.generateId();
  }

  private generateId(): string {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  addItem(productId: number, quantity: number): void {
    const existingItem = this.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
    
    this.updateCalculations();
  }

  updateItem(productId: number, quantity: number): void {
    const existingItem = this.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity = quantity;
      this.updateCalculations();
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.productId !== productId);
    this.updateCalculations();
  }

  hasProduct(productId: number): boolean {
    return this.items.some(item => item.productId === productId);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItemQuantity(productId: number): number {
    const item = this.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  destroy(): void {
    this.items = [];
    this.updateCalculations();
  }

  private updateCalculations(): void {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.uniqueItemsCount = this.items.length;
    this.calculateTotalAmount();
  }

  private calculateTotalAmount(): void {
    this.totalAmount = this.items.reduce((sum, item) => {
      const product = Product.findById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getItems(): ICartItem[] {
    return [...this.items];
  }
} 