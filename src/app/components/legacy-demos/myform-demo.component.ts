import { Component } from '@angular/core';

@Component({
  selector: 'app-myform-demo',
  standalone: true,
  template: `
    <table>
      <tr><td>Username:</td><td><input type="text" /></td></tr>
      <tr><td>Password:</td><td><input type="password" /></td></tr>
      <tr><td></td><td><button type="button">Login</button></td></tr>
    </table>
  `
})
export class MyformDemoComponent {}
