

import { CartService } from '../src/cart/cart.service';
import { FreebieRule } from '../src/freebie/freebie.model';
import { Discount } from '../src/discount/discount.model';

describe('CartService', () => {
  it('should add products and count items correctly', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 2);
    cartService.addProduct(3, 1);
    expect(cartService.getTotalItems()).toBe(3);
    expect(cartService.countUniqueItems()).toBe(2);
    expect(cartService.hasProduct(1)).toBe(true);
    expect(cartService.isCartEmpty()).toBe(false);
  });

  it('should update product with absolute quantity', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 5);
    cartService.updateProduct(1, 2);
    expect(cartService.getCart().getItemQuantity(1)).toBe(2);
  });

  it('should remove product correctly', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1);
    cartService.addProduct(2, 1);
    cartService.removeProduct(1);
    expect(cartService.hasProduct(1)).toBe(false);
    expect(cartService.hasProduct(2)).toBe(true);
    expect(cartService.countUniqueItems()).toBe(1);
  });

  it('should apply freebie when trigger product is added', () => {
    const cartService = new CartService();
    cartService.addFreebieRule(FreebieRule.create(1, 2, 1));
    cartService.addProduct(1, 1);
    expect(cartService.hasProduct(2)).toBe(true);
    expect(cartService.getCart().getItemQuantity(2)).toBe(1);
  });

  it('should remove freebie when trigger product is removed', () => {
    const cartService = new CartService();
    cartService.addFreebieRule(FreebieRule.create(1, 2, 1));
    cartService.addProduct(1, 1);
    cartService.removeProduct(1);
    expect(cartService.hasProduct(2)).toBe(false);
  });

  it('should apply fixed discount correctly', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1); // 1000 THB
    const discount = Discount.createFixedDiscount('FIXED100', 100);
    const result = cartService.applyDiscount(discount);
    expect(result.finalAmount).toBe(900);
    expect(result.discountAmount).toBe(100);
  });

  it('should apply percentage discount with max limit', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1); // 1000 THB
    const discount = Discount.createPercentageDiscount('PERCENT10', 10, 50); // 10% off, max 50
    const result = cartService.applyDiscount(discount);
    expect(result.finalAmount).toBe(950);
    expect(result.discountAmount).toBe(50); // Should be 50, not 100 (10% of 1000)
  });

  it('should stack freebies up to the limit', () => {
    const cartService = new CartService();
    cartService.addFreebieRule(FreebieRule.create(5, 10, 1, true, 2)); // Allow stacking up to 2
    cartService.addProduct(5, 1);
    cartService.addProduct(5, 1);
    cartService.addProduct(5, 1); // Third one shouldn't add more freebies
    expect(cartService.getCart().getItemQuantity(10)).toBe(2); // Should be limited to 2
  });

  it('should destroy cart and reset items', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1);
    cartService.destroyCart();
    expect(cartService.isCartEmpty()).toBe(true);
    expect(cartService.getTotalItems()).toBe(0);
  });

  it('should remove discount and restore total', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1); // 1000 THB
    const discount = Discount.createFixedDiscount('TEST100', 100);
    cartService.applyDiscount(discount);
    cartService.removeDiscount('TEST100');
    expect(cartService.getTotalAmount()).toBe(1000);
    expect(cartService.hasDiscount('TEST100')).toBe(false);
  });

  // Negative cases for cart operations
  it('should handle adding product with negative quantity', () => {
    const cartService = new CartService();
    expect(() => cartService.addProduct(1, -1)).toThrow();
  });

  it('should handle updating non-existent product', () => {
    const cartService = new CartService();
    cartService.updateProduct(999, 5); // Should not throw, just do nothing
    expect(cartService.hasProduct(999)).toBe(false);
  });

  it('should handle removing non-existent product', () => {
    const cartService = new CartService();
    cartService.removeProduct(999); // Should not throw, just do nothing
  });

  // Negative cases for discount operations
  it('should handle invalid discount amounts', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1);
    expect(() => Discount.createFixedDiscount('INVALID', -100)).toThrow();
  });

  it('should handle percentage discount over 100%', () => {
    const cartService = new CartService();
    cartService.addProduct(1, 1);
    expect(() => Discount.createPercentageDiscount('INVALID', 150, 100)).toThrow();
  });

  // Negative cases for freebie operations
  it('should handle invalid freebie rule', () => {
    expect(() => FreebieRule.create(999, 998, -1)).toThrow();
  });
}); 