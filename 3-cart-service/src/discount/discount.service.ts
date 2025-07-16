import { Discount } from './discount.model';
import { IDiscount, IDiscountResult } from './discount.interface';
import { Cart } from '../cart/cart.model';
import { Product } from '../product/product.model';
import { getTotalAmount } from '../utils';

export class DiscountService {
  private appliedDiscounts: Map<string, Discount> = new Map();

  applyDiscount(cart: Cart, discount: Discount): IDiscountResult {
    const result = discount.calculateDiscount(getTotalAmount(cart));
    
    // Store the applied discount
    this.appliedDiscounts.set(discount.name, discount);
    
    // Update cart total
    cart.totalAmount = result.finalAmount;
    
    return result;
  }

  removeDiscount(cart: Cart, discountName: string): boolean {
    const discount = this.appliedDiscounts.get(discountName);
    
    if (!discount) {
      return false;
    }

    // Remove the discount
    this.appliedDiscounts.delete(discountName);
    
    // Recalculate cart total without this discount
    this.recalculateCartTotal(cart);
    
    return true;
  }

  getAppliedDiscounts(): IDiscount[] {
    return Array.from(this.appliedDiscounts.values());
  }

  hasDiscount(discountName: string): boolean {
    return this.appliedDiscounts.has(discountName);
  }

  clearAllDiscounts(cart: Cart): void {
    this.appliedDiscounts.clear();
    this.recalculateCartTotal(cart);
  }

  private recalculateCartTotal(cart: Cart): void {
    // This is a simplified recalculation
    // In a real implementation, you'd need to track the original cart total
    // and reapply remaining discounts
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const product = Product.findById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }
} 