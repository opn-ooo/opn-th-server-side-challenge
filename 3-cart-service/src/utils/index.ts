import { Cart } from '../cart/cart.model';
import { ICartItem } from '../cart/cart.interface';

// Utility functions for cart operations - work only with Cart objects
export class CartUtils {
  /**
   * Check if product already exists in cart
   */
  static hasProduct(cart: Cart, productId: number): boolean {
    return cart.hasProduct(productId);
  }

  /**
   * Check if cart is empty
   */
  static isCartEmpty(cart: Cart): boolean {
    return cart.isEmpty();
  }

  /**
   * List all items in cart
   */
  static listAllItems(cart: Cart): ICartItem[] {
    return cart.getItems();
  }

  /**
   * Count number of unique items in cart
   */
  static countUniqueItems(cart: Cart): number {
    return cart.uniqueItemsCount;
  }

  /**
   * Return the total amount of items in cart
   */
  static getTotalItems(cart: Cart): number {
    return cart.totalItems;
  }

  /**
   * Get total amount (price) of cart
   */
  static getTotalAmount(cart: Cart): number {
    return cart.totalAmount;
  }
}

// Export individual utility functions for convenience
export const hasProduct = CartUtils.hasProduct;
export const isCartEmpty = CartUtils.isCartEmpty;
export const listAllItems = CartUtils.listAllItems;
export const countUniqueItems = CartUtils.countUniqueItems;
export const getTotalItems = CartUtils.getTotalItems;
export const getTotalAmount = CartUtils.getTotalAmount;
