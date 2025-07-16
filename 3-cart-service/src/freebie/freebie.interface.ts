export interface IFreebieRule {
  triggerProductId: number;
  freebieProductId: number;
  quantity: number;
  allowStacking?: boolean;
  maxStack?: number;
}

export interface IFreebieResult {
  applied: boolean;
  freebieProductId: number;
  quantity: number;
  message: string;
} 