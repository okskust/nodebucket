import { TestBed } from '@angular/core/testing';

import { SingInGuard } from './sing-in.guard';

describe('SingInGuard', () => {
  let guard: SingInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SingInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
