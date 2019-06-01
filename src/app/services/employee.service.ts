import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private data: any[] = [
    {name: 'Timmy', age: 24, position: 'Manager', hobbies: 'Managing stuff'},
    {name: 'Jimmy', age: 25, position: 'QA', hobbies: 'Testing stuff'},
    {name: 'Sarah', age: 23, position: 'Production', hobbies: 'Deploying stuff'},
    {name: 'Erxk', age: 25, position: 'Developer', hobbies: 'Brazilian Jiu Jitsu'}
  ];
  
  private subject = new BehaviorSubject(this.data);

  obs = this.subject.asObservable();

  constructor() { }
}
