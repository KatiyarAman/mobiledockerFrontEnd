import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydailogComponent } from './mydailog.component';

describe('MydailogComponent', () => {
  let component: MydailogComponent;
  let fixture: ComponentFixture<MydailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
