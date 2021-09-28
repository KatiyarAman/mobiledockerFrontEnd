import { TestBed } from '@angular/core/testing';

import { BookedServiceService } from './booked-service.service';

describe('BookedServiceService', () => {
  let service: BookedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
