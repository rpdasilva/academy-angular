import { TestBed, inject } from '@angular/core/testing';

import { DataFetcherService } from './data-fetcher.service';

describe('DataFetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFetcherService]
    });
  });

  it('should ...', inject([DataFetcherService], (service: DataFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
