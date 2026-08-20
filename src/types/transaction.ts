export type TryStatus = 'Verified' | 'Failed' | 'InBank' | 'NoAttempt';

export interface RawTransaction {
  session_key: string;
  try_seq: number;
  terminal_key: string;
  merchant_id: string;
  category_id: string;
  category_amount: number;
  adjusted_fee: number; // Relative index fee
  session_status: string;
  try_status: TryStatus;
  switch_resp?: string;
  psp_code: string;
  issuer_bank?: string;
  payer_card?: string;
  verify_type?: string;
  init_time?: number;
  verify_time?: number;
  created_at: string;
  try_create_at?: string;
  verified_at?: string;
  settled_at?: string;
  expire_in?: number;
}

export interface ActionableInsight {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'POSITIVE';
  title: string;
  description: string;
  impactValue: number;
  formattedImpact: string;
  actionText: string;
  actionType: 'SEND_SMS' | 'CHANGE_GATEWAY' | 'CAMPAIGN' | 'DOWNLOAD_REPORT';
  targetCount?: number;
  explanation: {
    formula: string;
    sampleSize: number;
    sampleSessionKeys: string[];
    affectedVolume: number;
  };
}

export interface AggregatedMetrics {
  totalRevenue: number;
  totalTransactions: number;
  successfulTransactions: number;
  overallSuccessRate: number;
  attemptedFailedVolume: number;
  noAttemptVolume: number;
  uniquePayers: number;
  topLoyalPayersCount: number;
  relativeFeeIndexRatio: number;
}