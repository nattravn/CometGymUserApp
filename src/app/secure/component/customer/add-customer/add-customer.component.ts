import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { Customer } from '@app/core/models/customer.model';

import { CustomerService } from '../service/customer.service';

interface CustomerForm {
    code: FormControl<string>;
    name: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    creditLimit: FormControl<number>;
    status: FormControl<boolean>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss'],
    standalone: false,
})
export class AddCustomerComponent implements OnInit {
    title = 'Add Customer';
    isEdit = false;
    editcode: string | undefined = '';
    editData$ = new Observable<Customer>();
    customerForm = new FormGroup<CustomerForm>({
        code: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        creditLimit: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
        status: new FormControl<boolean>(true, { nonNullable: true }),
    });

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private customerService: CustomerService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        console.log('sadsad');
        this.editcode = this.route.snapshot.paramMap.get('code')?.toString();
        if (this.editcode != '' && this.editcode) {
            this.isEdit = true;
            this.title = 'Edit Cust';
            this.customerForm.controls['code'].disable();
            this.editData$ = this.customerService.getByCode(this.editcode).pipe(
                tap(customer => {
                    console.log('customer: ', customer);
                    return this.customerForm.setValue({
                        code: customer.code,
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        creditLimit: customer.creditLimit,
                        status: customer.isActive,
                    });
                })
            );
        }
    }

    saveCustomer(): Observable<ApiResponse> {
        if (this.customerForm.valid) {
            const _obj = this.customerForm.getRawValue();

            const customer: Customer = {
                ..._obj,
                isActive: true,
                statusname: '',
            };

            if (!this.isEdit) {
                return this.customerService.createCustomer(customer).pipe(
                    tap(item => {
                        if (item.result === 'pass') {
                            this.toastr.success('Created successfully', 'Success');
                            console.log('5555555555');
                            this.router.navigateByUrl('app/customer');
                        } else {
                            console.log('error: ', item);
                            this.toastr.error(`Due to:${item.message}`, 'Failed');
                        }
                    }),
                    catchError(e => {
                        console.log('e: ', e);
                        return EMPTY;
                    })
                );
            } else {
                if (!this.editcode) return EMPTY;

                _obj.code = this.editcode;
                return this.customerService.updateCustomer(customer).pipe(
                    tap(item => {
                        if (item.result === 'pass') {
                            this.toastr.success('Updated successfully', 'Success');
                            this.router.navigateByUrl('app/customer');
                        } else {
                            this.toastr.error(`Due to:${item.message}`, 'Failed');
                        }
                    })
                );
            }
        }

        return of();
    }
}
