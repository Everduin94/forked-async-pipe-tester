import { Component, OnInit, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { interval, fromEvent } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit, OnDestroy {
  

  @ViewChild('completeBtn')
  completeBtn: ElementRef;

  observable$;
  toggleElement = false;

  constructor() { }

  ngOnInit() {
    console.log('Component: Creating Component!')
    const complete$ = fromEvent(this.completeBtn.nativeElement, 'click').pipe(
      tap(val => {
        console.log('Component: Clicked Complete Observable Button')
      }));
    this.observable$ = interval(3000).pipe(map(val => val + 1), takeUntil(complete$));
  }

  ngOnDestroy() {
    console.log('Component: Destroying Component!')
  }

  reassignObservable() {
    this.observable$ = interval(2000).pipe(map(val => val + 1), take(3));
  }

  toggleAsyncElement() {
    console.log('Component: Clicked Toggle Async Pipe Element Button')
    this.toggleElement = !this.toggleElement;
  }
}
