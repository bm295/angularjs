import { Component } from '@angular/core';

@Component({
  selector: 'app-rootscope-demo',
  standalone: true,
  template: `
    <div>Hello {{ rootName }}!</div>
    <div>Hello {{ rootName }}!</div>
  `
})
export class RootscopeDemoComponent {
  rootName = 'Davy Jones';
}
