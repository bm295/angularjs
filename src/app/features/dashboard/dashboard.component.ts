import { AsyncPipe, CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AlertService } from '../../core/services/alert.service';
import { KpiCardComponent } from '../../shared/widgets/kpi-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe, PercentPipe, KpiCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly vm$ = combineLatest([
    this.analyticsService.kpi$,
    this.analyticsService.branches$,
    this.alertService.alerts$
  ]).pipe(map(([kpi, branches, alerts]) => ({ kpi, branches, alerts })));

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly alertService: AlertService
  ) {}
}
