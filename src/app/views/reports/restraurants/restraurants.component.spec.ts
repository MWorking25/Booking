import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestraurantsComponent } from './restraurants.component';

describe('RestraurantsComponent', () => {
  let component: RestraurantsComponent;
  let fixture: ComponentFixture<RestraurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestraurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestraurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
