import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <section class="page">
      <h1>Alert & Anomaly Detection</h1>
      <table *ngIf="alerts$ | async as alerts">
        <thead><tr><th>Severity</th><th>Time</th><th>Branch</th><th>Service</th><th>Message</th></tr></thead>
        <tbody>
          <tr *ngFor="let alert of alerts">
            <td>{{ alert.severity }}</td>
            <td>{{ alert.time }}</td>
            <td>{{ alert.branch }}</td>
            <td>{{ alert.service }}</td>
            <td>{{ alert.message }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: ['.page{padding:24px} table{width:100%} th,td{text-align:left;padding:8px;border-bottom:1px solid #ddd}']
})
export class AlertsComponent {
  readonly alerts$ = this.alertService.alerts$;
  constructor(private readonly alertService: AlertService) {}
}
