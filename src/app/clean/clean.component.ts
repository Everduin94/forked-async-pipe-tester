import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css']
})
export class CleanComponent implements OnInit {

  observable$

  constructor() { }

  ngOnInit() {
    this.observable$ = interval(1000).pipe(
      map(val => val + 1), take(10)
    );
  }
}
