import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe],
  template: `
    <section class="page">
      <h1>Multi-branch Comparison</h1>
      <div *ngFor="let b of branches$ | async" class="row">
        <strong>{{ b.branch }}</strong>
        <span>{{ b.revenue | currency:'VND':'symbol':'1.0-0' }}</span>
        <span>Orders: {{ b.orders }}</span>
        <span>Conversion: {{ b.conversion }}%</span>
      </div>
    </section>
  `,
  styles: ['.page{padding:24px}.row{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:8px;padding:8px 0;border-bottom:1px solid #eee}']
})
export class BranchesComponent {
  readonly branches$ = this.analyticsService.branches$;
  constructor(private readonly analyticsService: AnalyticsService) {}
}
