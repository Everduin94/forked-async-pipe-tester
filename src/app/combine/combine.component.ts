import { Component, OnInit } from '@angular/core';
import { of, combineLatest, interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent implements OnInit {

  subj1 = new BehaviorSubject(1);
  subj2 = new BehaviorSubject(10);
  subj3 = new BehaviorSubject(25);
  allData$;

  constructor() { }

  ngOnInit() {
    const header$ = this.subj1.asObservable();
    const content$ = this.subj2.asObservable();
    const pageCount$ = this.subj3.asObservable();

    this.allData$ = combineLatest(
      header$,
      content$,
      pageCount$).pipe(
        map(([header, content, pageCount]) =>
          ({ header, content, pageCount }))
      );

      this.subj1.subscribe(val => console.log('Component: Clicked Increment Header!'))
      this.subj2.subscribe(val => console.log('Component: Clicked Increment Content!'))
      this.subj3.subscribe(val => console.log('Component: Clicked Increment Page Count!'))
  }

}
