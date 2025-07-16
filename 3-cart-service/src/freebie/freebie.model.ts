import { IFreebieRule } from './freebie.interface';

export class FreebieRule implements IFreebieRule {
  constructor(
    public triggerProductId: number, // trigger product is the product that will trigger the freebie
    public freebieProductId: number, // freebie product is the product that will be given for free
    public quantity: number = 1, // quantity of freebie product that will be given for free
    public allowStacking: boolean = false, // if true, the freebie will be applied for each trigger product
    public maxStack: number = 1 // if allowStacking is true, this will be the maximum number of freebies that can be applied for each trigger product
  ) {}

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