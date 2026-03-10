import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bind-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Enter content:</h2>
    <input [(ngModel)]="name" />
    <h2>Your content:</h2>
    <span>{{ name }}</span>
  `
})
export class BindDemoComponent {
  name = 'Welcome to A!';
}
