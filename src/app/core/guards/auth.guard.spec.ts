import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { MenuGuard } from './menu.guard';

describe('authGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => MenuGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
