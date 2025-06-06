import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, map, Observable, of, startWith, tap } from 'rxjs';

import { MaterialModule } from '@app/material/material.module';
import { ApiResponse } from '@app/models/api-response';
import { UserStoreService } from '@app/services/user.store.service';

import { AsyncClickModule } from '../directives/async-click.module';

// import { UserRegistration } from '@app/models/user.model';

// export type RegisterFormControls = {
//     [K in keyof RegisterFormModel]: FormControl<RegisterFormModel[K]>;
// };

interface RegisterForm {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    name: FormControl<string>;
    phone: FormControl<string>;
}

export interface RegisterFormModel {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    phone: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-register',
    imports: [ReactiveFormsModule, MaterialModule, CommonModule, AsyncClickModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    regForm = new FormGroup<RegisterForm>({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(5)],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        confirmPassword: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        phone: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    private _response: ApiResponse | undefined;

    public regForm$ = this.regForm.valueChanges.pipe(
        startWith({}),
        debounceTime(300),
        map(x => x as RegisterFormModel)
    );

    constructor(
        private userService: UserStoreService,
        private toastr: ToastrService,
        private router: Router
    ) {
        console.log('6666666666666');
    }

    proceedRegister(formValue: RegisterFormModel | null): Observable<ApiResponse> {
        if (!this.regForm.valid || !formValue) return of();
        const user: RegisterFormModel = this.regForm.getRawValue();

        this.regForm$.subscribe((x: RegisterFormModel) => {
            if (x != formValue) console.log('form valuse not in sync');
        });

        return this.userService.UserRegistartion(user).pipe(
            tap((apiResponse: ApiResponse) => {
                this._response = apiResponse;
                console.log('this._response: ', this._response);
                if (this._response.responseCode == HttpStatusCode.Ok) {
                    this.userService.registerResponse.set({
                        userid: +apiResponse.message,
                        otptext: '',
                        username: user.username,
                    });

                    this.toastr.success('Validate OTP & complete the registration', 'Registration');
                    this.router.navigateByUrl('/confirmotp');
                } else {
                    this.toastr.error(`Faild due to : ${this._response.message}`, 'Registration Faild');
                }
            })
        );
    }
}
