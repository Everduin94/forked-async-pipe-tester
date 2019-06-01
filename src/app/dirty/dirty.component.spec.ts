import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirtyComponent } from './dirty.component';

describe('DirtyComponent', () => {
  let component: DirtyComponent;
  let fixture: ComponentFixture<DirtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
