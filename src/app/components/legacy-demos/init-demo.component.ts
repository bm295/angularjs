import { Component } from '@angular/core';

@Component({
  selector: 'app-init-demo',
  standalone: true,
  template: `
    <div>{{ demo }}1</div>
    <div>{{ demo }}2</div>
    <div>{{ outsideDemo }}</div>
  `
})
export class InitDemoComponent {
  demo = 'content';
  outsideDemo = 'Outside scope in Angular component';
}
