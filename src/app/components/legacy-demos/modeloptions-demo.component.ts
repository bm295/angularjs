import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modeloptions-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h5>Type quickly then blur to update (updateOn: blur)</h5>
    <input [ngModelOptions]="{updateOn: 'blur'}" [(ngModel)]="message" />
    <p>Message: {{ message }}</p>
  `
})
export class ModeloptionsDemoComponent {
  message = '';
}
