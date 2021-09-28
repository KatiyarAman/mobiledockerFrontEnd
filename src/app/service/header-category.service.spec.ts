import { TestBed } from '@angular/core/testing';

import { HeaderCategoryService } from './header-category.service';

describe('HeaderCategoryService', () => {
  let service: HeaderCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
