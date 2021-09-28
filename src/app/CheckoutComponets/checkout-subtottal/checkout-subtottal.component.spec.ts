import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSubtottalComponent } from './checkout-subtottal.component';

describe('CheckoutSubtottalComponent', () => {
  let component: CheckoutSubtottalComponent;
  let fixture: ComponentFixture<CheckoutSubtottalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSubtottalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSubtottalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
