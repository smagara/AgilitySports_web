import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NhlService } from './nhl.service';

describe('NhlService', () => {
  let service: NhlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NhlService]
    });
    service = TestBed.inject(NhlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
