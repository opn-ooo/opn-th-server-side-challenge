import { IDiscount, IDiscountResult, DiscountType } from './discount.interface';

export class Discount implements IDiscount {
  constructor(
    public name: string,
    public type: DiscountType,
    public value: number,
    public maxAmount?: number
  ) {}

  calculateDiscount(originalAmount: number): IDiscountResult {
    let discountAmount = 0;

    if (this.type === 'fixed') {
      discountAmount = Math.min(this.value, originalAmount);
    } else if (this.type === 'percentage') {
      const percentageDiscount = (originalAmount * this.value) / 100;
      discountAmount = this.maxAmount 
        ? Math.min(percentageDiscount, this.maxAmount)
        : percentageDiscount;
    }

    const finalAmount = Math.max(0, originalAmount - discountAmount);

    return {
      originalAmount,
      discountAmount,
      finalAmount,
      appliedDiscount: this
    };
  }

  static createFixedDiscount(name: string, value: number): Discount {
    return new Discount(name, 'fixed', value);
  }

  static createPercentageDiscount(name: string, percentage: number, maxAmount?: number): Discount {
    return new Discount(name, 'percentage', percentage, maxAmount);
  }
} 