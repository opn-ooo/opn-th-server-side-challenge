import { Cart } from './cart.model';
import { DiscountService } from '../discount/discount.service';
import { FreebieService } from '../freebie/freebie.service';
import { Discount } from '../discount/discount.model';
import { FreebieRule } from '../freebie/freebie.model';
import { ICartItem } from './cart.interface';
import { IDiscountResult } from '../discount/discount.interface';
import { IFreebieResult } from '../freebie/freebie.interface';
import { hasProduct, isCartEmpty, listAllItems, countUniqueItems, getTotalItems, getTotalAmount } from '../utils';
import { Product } from '../product/product.model';

export class CartService {
  private cart: Cart;
  private discountService: DiscountService;
  private freebieService: FreebieService;

  constructor(cartId?: string) {
    this.cart = new Cart(cartId);
    this.discountService = new DiscountService();
    this.freebieService = new FreebieService();
  }

  createCart(cartId?: string): Cart {
    this.cart = new Cart(cartId);
    return this.cart;
  }

  addProduct(productId: number, quantity: number): void {    
    // Validate input parameters
    if (quantity <= 0) {
      throw new Error(`Invalid quantity: ${quantity}. Quantity must be greater than 0.`);
    }
    
    if (!Product.findById(productId)) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
    
    this.cart.addItem(productId, quantity);
    // check and process freebies
    this.freebieService.applyFreebies(this.cart);
  }

  updateProduct(productId: number, quantity: number): void {
    // Validate input parameters
    if (quantity < 0) {
      throw new Error(`Invalid quantity: ${quantity}. Quantity cannot be negative.`);
    }
        
    this.cart.updateItem(productId, quantity);
    // check and process freebies
    this.freebieService.applyFreebies(this.cart);
  }

  removeProduct(productId: number): void {    
    this.cart.removeItem(productId);
    // remove freebies for the trigger product
    this.freebieService.removeFreebiesForTrigger(this.cart, productId);
  }

  destroyCart(): void {
    this.cart.destroy();
  }

  // Utility Operations
  hasProduct(productId: number): boolean {
    return hasProduct(this.cart, productId);
  }

  isCartEmpty(): boolean {
    return isCartEmpty(this.cart);
  }

  listAllItems(): ICartItem[] {
    return listAllItems(this.cart);
  }

  countUniqueItems(): number {
    return countUniqueItems(this.cart);
  }

  getTotalItems(): number {
    return getTotalItems(this.cart);
  }

  getTotalAmount(): number {
    return getTotalAmount(this.cart);
  }

  // Discount Operations
  applyDiscount(discount: Discount): IDiscountResult {
    return this.discountService.applyDiscount(this.cart, discount);
  }

  removeDiscount(discountName: string): boolean {
    return this.discountService.removeDiscount(this.cart, discountName);
  }

  getAppliedDiscounts() {
    return this.discountService.getAppliedDiscounts();
  }

  hasDiscount(discountName: string): boolean {
    return this.discountService.hasDiscount(discountName);
  }

  clearAllDiscounts(): void {
    this.discountService.clearAllDiscounts(this.cart);
  }

  // Freebie Operations
  addFreebieRule(rule: FreebieRule): void {
    this.freebieService.addFreebieRule(rule);
  }

  removeFreebieRule(triggerProductId: number, freebieProductId: number): boolean {
    return this.freebieService.removeFreebieRule(triggerProductId, freebieProductId);
  }

  getFreebieRules() {
    return this.freebieService.getFreebieRules();
  }

  applyFreebies(): IFreebieResult[] {
    return this.freebieService.applyFreebies(this.cart);
  }

  clearAllFreebieRules(): void {
    this.freebieService.clearAllRules();
  }

  // Get Cart Info
  getCart(): Cart {
    return this.cart;
  }

  getCartInfo() {
    return {
      id: this.cart.id,
      items: this.cart.getItems(),
      totalAmount: this.cart.totalAmount,
      totalItems: this.cart.totalItems,
      uniqueItemsCount: this.cart.uniqueItemsCount,
      appliedDiscounts: this.discountService.getAppliedDiscounts(),
      freebieRules: this.freebieService.getFreebieRules()
    };
  }
} 