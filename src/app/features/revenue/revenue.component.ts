import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe],
  template: `
    <section class="page" *ngIf="branches$ | async as branches">
      <h1>Revenue Drill-down</h1>
      <p>Revenue → Branch → Orders → Order details</p>
      <ul>
        <li *ngFor="let b of branches">{{ b.branch }}: {{ b.revenue | currency:'VND':'symbol':'1.0-0' }}</li>
      </ul>
    </section>
  `,
  styles: ['.page{padding:24px}']
})
export class RevenueComponent {
  readonly branches$ = this.analyticsService.branches$;
  constructor(private readonly analyticsService: AnalyticsService) {}
}
