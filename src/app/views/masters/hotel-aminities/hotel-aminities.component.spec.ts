import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAminitiesComponent } from './hotel-aminities.component';

describe('HotelAminitiesComponent', () => {
  let component: HotelAminitiesComponent;
  let fixture: ComponentFixture<HotelAminitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAminitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAminitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
