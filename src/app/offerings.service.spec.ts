import { TestBed, inject } from '@angular/core/testing';

import { OfferingsService } from './offerings.service';

describe('OfferingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferingsService]
    });
  });

  it('should ...', inject([OfferingsService], (service: OfferingsService) => {
    expect(service).toBeTruthy();
  }));
});
