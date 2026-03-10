import { Component } from '@angular/core';

@Component({
  selector: 'app-innerscope-demo',
  standalone: true,
  template: `
    <div>
      <div>Hello {{ name }} from group {{ topGroup }}!</div>
      <div>Hello {{ name }} from group {{ greetGroup }}!</div>
      <div>Hello {{ name }} from group {{ listGroup }}!</div>
    </div>
  `
})
export class InnerscopeDemoComponent {
  name = 'demo';
  topGroup = 'Top';
  greetGroup = 'Greet';
  listGroup = 'List';
}
