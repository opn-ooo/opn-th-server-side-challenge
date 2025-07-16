import { IDiscount, IDiscountResult, DiscountType } from './discount.interface';

export class Discount implements IDiscount {
  constructor(
    public name: string,
    public type: DiscountType,
    public value: number,
    public maxAmount?: number
  ) {
    // Validate discount parameters
    if (!name || name.trim() === '') {
      throw new Error('Discount name cannot be empty.');
    }
    
    if (value < 0) {
      throw new Error(`Invalid discount value: ${value}. Discount value cannot be negative.`);
    }
    
    if (type === 'percentage' && value > 100) {
      throw new Error(`Invalid percentage discount: ${value}%. Percentage cannot exceed 100%.`);
    }
    
    if (maxAmount !== undefined && maxAmount < 0) {
      throw new Error(`Invalid max amount: ${maxAmount}. Max amount cannot be negative.`);
    }
  }

  calculateDiscount(originalAmount: number): IDiscountResult {
    if (originalAmount < 0) {
      throw new Error(`Invalid original amount: ${originalAmount}. Amount cannot be negative.`);
    }
    
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