import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzeListComponent } from './cruze-list.component';

describe('CruzeListComponent', () => {
  let component: CruzeListComponent;
  let fixture: ComponentFixture<CruzeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CruzeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruzeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
