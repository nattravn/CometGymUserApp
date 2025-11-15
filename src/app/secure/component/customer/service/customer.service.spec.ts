import { inject, TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';

describe('Service: Customer', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [CustomerService],
        });
    });

    it('should ...', inject([CustomerService], (service: CustomerService) => {
        expect(service).toBeTruthy();
    }));
});
