import { IFreebieRule } from './freebie.interface';
import { Product } from '../product/product.model';

export class FreebieRule implements IFreebieRule {
  constructor(
    public triggerProductId: number, // trigger product is the product that will trigger the freebie
    public freebieProductId: number, // freebie product is the product that will be given for free
    public quantity: number = 1, // quantity of freebie product that will be given for free
    public allowStacking: boolean = false, // if true, the freebie will be applied for each trigger product
    public maxStack: number = 1 // if allowStacking is true, this will be the maximum number of freebies that can be applied for each trigger product
  ) {
    // Validate freebie rule parameters
    if (triggerProductId <= 0) {
      throw new Error(`Invalid trigger product ID: ${triggerProductId}. Product ID must be positive.`);
    }
    
    if (freebieProductId <= 0) {
      throw new Error(`Invalid freebie product ID: ${freebieProductId}. Product ID must be positive.`);
    }
    
    if (quantity <= 0) {
      throw new Error(`Invalid freebie quantity: ${quantity}. Quantity must be greater than 0.`);
    }
    
    if (maxStack <= 0) {
      throw new Error(`Invalid max stack: ${maxStack}. Max stack must be greater than 0.`);
    }
    
    // Check if products exist
    if (!Product.findById(triggerProductId)) {
      throw new Error(`Trigger product with ID ${triggerProductId} does not exist.`);
    }
    
    if (!Product.findById(freebieProductId)) {
      throw new Error(`Freebie product with ID ${freebieProductId} does not exist.`);
    }
  }

  static create(
    triggerProductId: number,
    freebieProductId: number,
    quantity: number = 1,
    allowStacking: boolean = false,
    maxStack: number = 1
  ): FreebieRule {
    return new FreebieRule(triggerProductId, freebieProductId, quantity, allowStacking, maxStack);
  }
} 