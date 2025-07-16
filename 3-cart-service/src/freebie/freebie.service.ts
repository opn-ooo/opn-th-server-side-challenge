import { FreebieRule } from './freebie.model';
import { IFreebieRule, IFreebieResult } from './freebie.interface';
import { Cart } from '../cart/cart.model';
import { hasProduct } from '../utils';

export class FreebieService {
  private freebieRules: FreebieRule[] = [];

  addFreebieRule(rule: FreebieRule): void {
    this.freebieRules.push(rule);
  }

  removeFreebieRule(triggerProductId: number, freebieProductId: number): boolean {
    const initialLength = this.freebieRules.length;
    this.freebieRules = this.freebieRules.filter(
      rule => !(rule.triggerProductId === triggerProductId && rule.freebieProductId === freebieProductId)
    );
    return this.freebieRules.length < initialLength;
  }

  getFreebieRules(): FreebieRule[] {
    return [...this.freebieRules];
  }

  applyFreebies(cart: Cart): IFreebieResult[] {
    const results: IFreebieResult[] = [];

    this.freebieRules.forEach(rule => {
      if (hasProduct(cart, rule.triggerProductId)) {
        const currentFreebieQty = cart.getItemQuantity(rule.freebieProductId);
        const maxAllowed = rule.allowStacking ? rule.maxStack : 1;
        
        if (currentFreebieQty < maxAllowed) {
          cart.addItem(rule.freebieProductId, rule.quantity);
          
          results.push({
            applied: true,
            freebieProductId: rule.freebieProductId,
            quantity: rule.quantity,
            message: `Freebie applied: Product ${rule.freebieProductId} added for buying Product ${rule.triggerProductId}`
          });
        } else {
          results.push({
            applied: false,
            freebieProductId: rule.freebieProductId,
            quantity: 0,
            message: `Freebie limit reached for Product ${rule.freebieProductId}`
          });
        }
      }
    });

    return results;
  }

  removeFreebiesForTrigger(cart: Cart, triggerProductId: number): void {
    this.freebieRules.forEach(rule => {
      if (rule.triggerProductId === triggerProductId) {
        cart.removeItem(rule.freebieProductId);
      }
    });
  }

  clearAllRules(): void {
    this.freebieRules = [];
  }
} 