// Credit: https://stackblitz.com/edit/rxjs-behaviorsubject-simpleexample?file=index.ts?file=index.ts&devtoolsheight=100

console.clear();
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject('version 1');

// 2 new subscribers get initial value, output => version 1, version 1
subject.subscribe(console.log);
subject.subscribe(console.log);

// 2 current subscribers get new value, output => version 2, version 2
subject.next('version 2');

// 1 new subscriber get new value, output => version 1
subject.subscribe(console.log);

// 3 current subscribers get new value, output => version 3, version 3, version 3
subject.next('version 3');
