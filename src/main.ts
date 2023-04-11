import 'zone.js/dist/zone';
import { Component, computed, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter, Routes } from '@angular/router';
import { TestArraysCmp } from './testing-arrays.component';
import { TestObjectsCmp } from './testing-objects.component';

/*
  ⚠️ Please keep in mind that this is only the signals implementation. We still depend on zone and current CD strategy to propagate change in the template which might not be the case when Angular releases signals officially!
*/

// Signals are primitives, so we can use them outside the component class
const myValue = signal(10000);

// Uncomment this
// setInterval(() => {
//   myValue.update((s) => s - 1);
// }, 1000);

@Component({
  selector: 'my-app',
  standalone: true,
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ double() }}</div>

    <button (click)="inc()">Increase</button>
    <button (click)="reset()">Reset</button>
    
    <br>
    <test-arrays />
    <test-objects />

  `,
  imports: [TestArraysCmp, TestObjectsCmp],
})
export class App {
  count = signal(0);

  double = computed(() => this.count() * 2);

  countType = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));

  constructor() {}

  inc() {
    this.count.update((c) => c + 1);
  }

  reset() {
    this.count.set(0);
  }
}

const routes: Routes = [
  {
    path: 'search',
    // component: SearchComponent, // uncomment this for component with ActivatedRoute
    component: TestArraysCmp,
  },
  {
    path: 'search1',
    // component: SearchComponent,  // uncomment this for component with ActivatedRoute
    component: TestObjectsCmp,
  },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});

bootstrapApplication(App);
