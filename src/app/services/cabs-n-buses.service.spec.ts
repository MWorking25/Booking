import { TestBed } from '@angular/core/testing';

import { CabsNBusesService } from './cabs-n-buses.service';

describe('CabsNBusesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabsNBusesService = TestBed.get(CabsNBusesService);
    expect(service).toBeTruthy();
  });
});
