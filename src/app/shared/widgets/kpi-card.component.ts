import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="kpi-card">
      <h3>{{ label }}</h3>
      <p>{{ value }}</p>
    </article>
  `,
  styles: [
    '.kpi-card{background:#fff;border:1px solid #e4e7ec;border-radius:12px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.04)}',
    'h3{margin:0 0 8px;font-size:14px;color:#475467}',
    'p{margin:0;font-size:24px;font-weight:700;color:#101828}'
  ]
})
export class KpiCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
}
