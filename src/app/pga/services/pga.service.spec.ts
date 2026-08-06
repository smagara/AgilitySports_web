import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PgaService } from './pga.service';

describe('PgaService', () => {
  let service: PgaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PgaService]
    });
    service = TestBed.inject(PgaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
