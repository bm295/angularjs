import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-require-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  styles: [`.invalid{color:white;background:red;}`],
  template: `
    <h2>Please input</h2>
    <input [formControl]="val" [class.invalid]="val.invalid && val.touched" />
  `
})
export class RequireDemoComponent {
  readonly val = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}
