import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {

  private observable$;
  private toggler = new BehaviorSubject(false);

  constructor(private es: EmployeeService) {}

  ngOnInit() {
    this.observable$ = this.es.obs;
    // this.toggler.subscribe(val => console.log('Component: Clicked Toggle Component Button!'));
  }

}
