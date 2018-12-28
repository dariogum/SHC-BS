import { TestBed } from '@angular/core/testing';

import { SocialSecurityService } from './social-security.service';

describe('SocialSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialSecurityService = TestBed.get(SocialSecurityService);
    expect(service).toBeTruthy();
  });
});
