import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardEditComponent } from './dash-board-edit.component';

describe('DashBoardEditComponent', () => {
  let component: DashBoardEditComponent;
  let fixture: ComponentFixture<DashBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
