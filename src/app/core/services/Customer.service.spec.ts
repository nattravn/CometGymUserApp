import { inject, TestBed } from '@angular/core/testing';

import { CustomerService } from './Customer.service';

describe('Service: Customer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CustomerService],
        });
    });

    it('should ...', inject([CustomerService], (service: CustomerService) => {
        expect(service).toBeTruthy();
    }));
});
