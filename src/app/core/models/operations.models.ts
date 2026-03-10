export type Severity = 'low' | 'medium' | 'high';

export interface KpiSnapshot {
  revenueToday: number;
  ordersToday: number;
  averageOrderValue: number;
  paymentSuccessRate: number;
}

export interface BranchPerformance {
  branch: string;
  region: string;
  revenue: number;
  orders: number;
  conversion: number;
}

export interface OperationEvent {
  time: string;
  branch: string;
  service: 'order' | 'payment' | 'inventory' | 'delivery';
  status: 'success' | 'failure' | 'pending';
  detail: string;
}

export interface AlertItem {
  id: string;
  severity: Severity;
  time: string;
  branch: string;
  service: string;
  message: string;
}
