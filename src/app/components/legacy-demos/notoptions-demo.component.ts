import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notoptions-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h5>Enter the announcement for village</h5>
    <input type="text" [(ngModel)]="announcement" />
    <h5>This is the announcement</h5>
    <span>{{ announcement }}</span>
  `
})
export class NotoptionsDemoComponent {
  announcement = '';
}
