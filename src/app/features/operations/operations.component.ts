import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { scan, startWith } from 'rxjs';
import { AnalyticsService } from '../../core/services/analytics.service';
import { OperationEvent } from '../../core/models/operations.models';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <section class="page">
      <h1>Operational Monitoring</h1>
      <ul>
        <li *ngFor="let event of events$ | async">
          {{ event.time }} - {{ event.branch }} - {{ event.service }} - {{ event.status }} - {{ event.detail }}
        </li>
      </ul>
    </section>
  `,
  styles: ['.page{padding:24px}']
})
export class OperationsComponent {
  readonly events$ = this.analyticsService.events$.pipe(
    scan((acc: OperationEvent[], curr) => [curr, ...acc].slice(0, 15), []),
    startWith([] as OperationEvent[])
  );

  constructor(private readonly analyticsService: AnalyticsService) {}
}
