import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, combineLatest, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';

import { WebContact } from '../../models/web-contact';

type ContactStatus = 'Online' | 'Offline';

interface WebInfoVm {
  contacts: WebContact[];
  selected: WebContact | null;
  status: ContactStatus;
}

@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: ['./web-info.component.css']
})
export class WebInfoComponent implements OnDestroy {
  readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly contacts: WebContact[] = [
    { id: 1, fullname: 'John Smith', email: 'john@mytuts.com', phone: '12345', topic: 'Online Tuts', website: 'mytuts.com' },
    { id: 2, fullname: 'Anna Lee', email: 'anna@cloudnews.io', phone: '39391', topic: 'Cloud News', website: 'cloudnews.io' },
    { id: 3, fullname: 'Minh Tran', email: 'minh@frontend.vn', phone: '88888', topic: 'Frontend Lab', website: 'frontend.vn' },
    { id: 4, fullname: 'Sara Kim', email: 'sara@securitywatch.org', phone: '71717', topic: 'Security Watch', website: 'securitywatch.org' },
    { id: 5, fullname: 'David Park', email: 'david@uxhub.design', phone: '61616', topic: 'UX Hub', website: 'uxhub.design' }
  ];

  private readonly selectedId$ = new BehaviorSubject<number>(this.contacts[0].id);
  private readonly destroy$ = new Subject<void>();

  readonly filteredContacts$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    map((query) => query.trim().toLowerCase()),
    debounceTime(120),
    distinctUntilChanged(),
    map((query) => {
      if (!query) {
        return this.contacts;
      }

      return this.contacts.filter((contact) =>
        contact.fullname.toLowerCase().includes(query)
        || contact.topic.toLowerCase().includes(query)
        || contact.email.toLowerCase().includes(query)
        || contact.website.toLowerCase().includes(query)
      );
    })
  );

  readonly selectedContact$ = combineLatest([this.filteredContacts$, this.selectedId$]).pipe(
    map(([contacts, selectedId]) => contacts.find((contact) => contact.id === selectedId) ?? contacts[0] ?? null)
  );

  readonly status$ = interval(4000).pipe(
    startWith(0),
    map(() => (Math.random() > 0.35 ? 'Online' : 'Offline') as ContactStatus)
  );

  readonly vm$ = combineLatest([this.filteredContacts$, this.selectedContact$, this.status$]).pipe(
    map(([contacts, selected, status]) => ({ contacts, selected, status }) as WebInfoVm)
  );

  constructor() {
    this.selectedContact$
      .pipe(takeUntil(this.destroy$))
      .subscribe((selected) => {
        if (selected && this.selectedId$.value !== selected.id) {
          this.selectedId$.next(selected.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectContact(id: number): void {
    this.selectedId$.next(id);
  }
}
