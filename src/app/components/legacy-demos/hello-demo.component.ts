import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hello-demo',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label>Input name: <input [(ngModel)]="username" /></label>
    <button type="button" (click)="sayHi()">Show hi message</button>
    <p>{{ greeting }}</p>
  `
})
export class HelloDemoComponent {
  username = '';
  greeting = '';

  sayHi(): void {
    this.greeting = `Hi ${this.username}!`;
  }
}
