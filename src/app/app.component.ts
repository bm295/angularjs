import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { ConstructorChildComponent } from './constructor-child.component';

interface LogEntry {
  source: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'constructor-visualizer',
  standalone: true,
  imports: [CommonModule, ConstructorChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly entries = signal<LogEntry[]>([]);
  protected readonly showChild = signal(true);

  constructor() {
    this.log('AppComponent', 'constructor() runs when Angular creates the root component.');
  }

  protected recreateChild(): void {
    this.showChild.set(false);

    queueMicrotask(() => {
      this.showChild.set(true);
      this.log('AppComponent', 'Angular was asked to create a fresh child component instance.');
    });
  }

  protected onChildConstructed(instanceId: number): void {
    this.log('ConstructorChildComponent', `constructor() fired for child instance #${instanceId}.`);
  }

  private log(source: string, message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.entries.update((items) => [{ source, message, timestamp }, ...items]);
  }
}
