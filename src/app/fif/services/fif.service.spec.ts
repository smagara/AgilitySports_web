import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FifService } from './fif.service';

describe('FifService', () => {
  let service: FifService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FifService]
    });
    service = TestBed.inject(FifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
