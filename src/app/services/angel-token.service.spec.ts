import { TestBed, inject } from '@angular/core/testing';

import { AngelTokenService } from './angel-token.service';
import {Web3Service} from './services'

describe('MetaCoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngelTokenService, Web3Service]
    });
  });

  it('should be created', inject([AngelTokenService], (service: AngelTokenService) => {
    expect(service).toBeTruthy();
  }));
});
