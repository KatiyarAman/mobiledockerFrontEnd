import { TestBed } from '@angular/core/testing';

import { AddPartService } from './add-part.service';

describe('AddPartService', () => {
  let service: AddPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
