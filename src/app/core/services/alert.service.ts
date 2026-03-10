import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertItem } from '../models/operations.models';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly alertsSubject = new BehaviorSubject<AlertItem[]>([
    {
      id: 'AL-001',
      severity: 'high',
      time: '09:12',
      branch: 'Hanoi 02',
      service: 'payment',
      message: 'Payment failure rate > 5%'
    },
    {
      id: 'AL-002',
      severity: 'medium',
      time: '09:18',
      branch: 'Hanoi 02',
      service: 'inventory',
      message: 'Inventory mismatch detected'
    },
    {
      id: 'AL-003',
      severity: 'high',
      time: '09:25',
      branch: 'Saigon 03',
      service: 'order',
      message: 'Pending orders > 10 minutes'
    }
  ]);

  readonly alerts$ = this.alertsSubject.asObservable();
}
