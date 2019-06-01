import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-dirty',
  templateUrl: './dirty.component.html',
  styleUrls: ['./dirty.component.css']
})
export class DirtyComponent implements OnInit {

  observable$ = interval(1000).pipe(map(val=> val + 1), take(10));

  constructor() { }

  ngOnInit() {}
}
