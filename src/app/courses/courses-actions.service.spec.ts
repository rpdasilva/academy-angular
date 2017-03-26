import { TestBed, inject } from '@angular/core/testing';

import { CoursesActionsService } from './courses-actions.service';

describe('CoursesActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesActionsService]
    });
  });

  it('should ...', inject([CoursesActionsService], (service: CoursesActionsService) => {
    expect(service).toBeTruthy();
  }));
});
