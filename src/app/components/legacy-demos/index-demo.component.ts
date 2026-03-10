import { Component } from '@angular/core';

@Component({
  selector: 'app-index-demo',
  standalone: true,
  template: `
    <h2>Welcome {{ header.title }} to {{ header.website }}</h2>
    <h2>Welcome {{ content.title }} to {{ content.website }}</h2>
  `
})
export class IndexDemoComponent {
  header = { title: 'everyone', website: 'my blog' };
  content = { title: 'all', website: 'my website' };
}
