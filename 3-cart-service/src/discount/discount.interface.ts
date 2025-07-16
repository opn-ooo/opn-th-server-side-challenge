export type DiscountType = 'fixed' | 'percentage';

export interface IDiscount {
  name: string;
  type: DiscountType;
  value: number;
  maxAmount?: number; // For percentage discounts
}

export interface IDiscountResult {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  appliedDiscount: IDiscount;
} 