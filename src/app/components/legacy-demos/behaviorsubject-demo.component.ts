import { AsyncPipe } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VersionStore {
  private readonly versionSubject = new BehaviorSubject<string>('version 1');
  readonly version$ = this.versionSubject.asObservable();

  updateVersion(version: string): void {
    this.versionSubject.next(version);
  }
}

@Component({
  selector: 'app-behavior-subject-simple-example',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section>
      <h2>BehaviorSubject in Angular 19</h2>
      <p>Current version: {{ store.version$ | async }}</p>
      <button type="button" (click)="setVersion('version 2')">Set version 2</button>
      <button type="button" (click)="setVersion('version 3')">Set version 3</button>
    </section>
  `
})
export class BehaviorSubjectSimpleExampleComponent {
  constructor(public readonly store: VersionStore) {}

  setVersion(version: string): void {
    this.store.updateVersion(version);
  }
}
