import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzedeailsComponent } from './cruzedeails.component';

describe('CruzedeailsComponent', () => {
  let component: CruzedeailsComponent;
  let fixture: ComponentFixture<CruzedeailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CruzedeailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzedeailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
