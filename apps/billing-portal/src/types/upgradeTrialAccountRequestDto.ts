export interface UpgradeTrialAccountRequestDto {
  seats: number;
  billingAccountToken: string;
  accountHolderName: string;
  accountHolderEmail: string;
  cancelUrl: string;
  successUrl: string;
  productId?: string;
}
