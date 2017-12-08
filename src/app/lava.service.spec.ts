import { TestBed, inject } from '@angular/core/testing';

import { LavaService } from './lava.service';

describe('LavaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LavaService]
    });
  });

  it('should be created', inject([LavaService], (service: LavaService) => {
    expect(service).toBeTruthy();
  }));
});
