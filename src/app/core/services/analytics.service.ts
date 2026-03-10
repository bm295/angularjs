import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';
import { BranchPerformance, KpiSnapshot, OperationEvent } from '../models/operations.models';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly kpiSubject = new BehaviorSubject<KpiSnapshot>({
    revenueToday: 120_500_000,
    ordersToday: 1204,
    averageOrderValue: 100_000,
    paymentSuccessRate: 98.2
  });

  private readonly branchesSubject = new BehaviorSubject<BranchPerformance[]>([
    { branch: 'Hanoi 01', region: 'North', revenue: 50_000_000, orders: 480, conversion: 7.4 },
    { branch: 'Hanoi 02', region: 'North', revenue: 35_000_000, orders: 390, conversion: 6.8 },
    { branch: 'Saigon 03', region: 'South', revenue: 20_000_000, orders: 252, conversion: 5.9 }
  ]);

  readonly kpi$ = this.kpiSubject.asObservable();
  readonly branches$ = this.branchesSubject.asObservable();

  readonly events$ = interval(5000).pipe(
    map((tick): OperationEvent => {
      const branch = tick % 2 === 0 ? 'Hanoi 01' : 'Saigon 03';
      const service = tick % 3 === 0 ? 'payment' : tick % 3 === 1 ? 'order' : 'inventory';
      const status = tick % 4 === 0 ? 'pending' : 'success';
      return {
        time: new Date().toLocaleTimeString('vi-VN'),
        branch,
        service,
        status,
        detail: `${service} event received from ${branch}`
      };
    })
  );
}
