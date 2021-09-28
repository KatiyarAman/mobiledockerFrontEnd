import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardListComponent } from './dash-board-list.component';

describe('DashBoardListComponent', () => {
  let component: DashBoardListComponent;
  let fixture: ComponentFixture<DashBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
