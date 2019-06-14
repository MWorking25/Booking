import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzeBookingComponent } from './cruze-booking.component';

describe('CruzeBookingComponent', () => {
  let component: CruzeBookingComponent;
  let fixture: ComponentFixture<CruzeBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CruzeBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
