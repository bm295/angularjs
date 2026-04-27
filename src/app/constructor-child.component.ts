import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'constructor-child',
  standalone: true,
  template: `
    <section class="child-card">
      <h3>Child component instance #{{ instanceId }}</h3>
      <p>
        This card is rendered after Angular runs this component's
        <code>constructor()</code>.
      </p>
    </section>
  `
})
export class ConstructorChildComponent {
  @Output() readonly constructed = new EventEmitter<number>();

  readonly instanceId: number;

  constructor() {
    this.instanceId = ConstructorChildComponent.nextId;
    ConstructorChildComponent.nextId += 1;
    this.constructed.emit(this.instanceId);
  }

  private static nextId = 1;
}
