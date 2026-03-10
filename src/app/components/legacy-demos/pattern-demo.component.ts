import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pattern-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  styles: [`.invalid{color:white;background:red;}`],
  template: `
    <h2>Please enter numbers only</h2>
    <input [formControl]="val" [class.invalid]="val.invalid && val.touched" />
  `
})
export class PatternDemoComponent {
  readonly val = new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^\d+$/)] });
}
