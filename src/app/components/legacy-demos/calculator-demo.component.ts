import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Simple Calculator</h2>
    <input [(ngModel)]="num1" type="number" placeholder="1st number" />
    <input [(ngModel)]="num2" type="number" placeholder="2nd number" />
    <div>
      Plus {{ num1 + num2 }}<br>
      Minus {{ num1 - num2 }}<br>
      Multiply {{ num1 * num2 }}<br>
      Divide {{ num2 ? num1 / num2 : 'N/A' }}
    </div>
  `
})
export class CalculatorDemoComponent {
  num1 = 0;
  num2 = 0;
}
