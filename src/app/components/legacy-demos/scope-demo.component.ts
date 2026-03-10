import { Component } from '@angular/core';

@Component({
  selector: 'app-scope-demo',
  standalone: true,
  template: `
    <div>Hello {{ greetName }}!</div>
    <div>Hello {{ listName }}!</div>
  `
})
export class ScopeDemoComponent {
  greetName = 'Davy Jones';
  listName = 'Online Tutor';
}
