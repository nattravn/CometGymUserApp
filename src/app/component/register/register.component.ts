import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { MaterialModule } from '@app/material/material.module';
import { ApiResponse } from '@app/models/api-response';
import { UserRegistration } from '@app/models/user.model';
import { UserService } from '@app/services/user.service';

// import { UserRegistration } from '@app/models/user.model';

export type RegisterFormControls = {
    [K in keyof RegisterFormModel]: FormControl<RegisterFormModel[K]>;
};

interface RegisterForm {
    userName: FormControl<string>;
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
    selector: 'app-register',
    imports: [ReactiveFormsModule, MaterialModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    formBuilder2: FormBuilder = new FormBuilder();
    //regForm!: FormGroup<RegisterFormControls>;
    _regForm!: FormGroup<RegisterForm>;
    private _response: ApiResponse | undefined;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router
    ) {}
    ngOnInit(): void {
        // this.regForm = this.fb.nonNullable.group<RegisterFormControls>({
        //     username: this.fb.nonNullable.control(
        //         '',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.minLength(5),
        //         ])
        //     ),
        //     password: this.fb.nonNullable.control('', Validators.required),
        //     confirmPassword: this.fb.nonNullable.control(
        //         '',
        //         Validators.required
        //     ),
        //     name: this.fb.nonNullable.control('', Validators.required),
        //     email: this.fb.nonNullable.control('', Validators.required),
        //     phone: this.fb.nonNullable.control('', Validators.required),
        // });

        this._regForm = new FormGroup<RegisterForm>({
            userName: new FormControl('', {
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
    }

    proceedregister() {
        if (this._regForm.valid) {
            const { userName, name, phone, email, password } = this._regForm.getRawValue();
            const _obj: UserRegistration = {
                userName: userName,
                name,
                phone,
                email,
                password,
            };
            this.userService.UserRegistartion(_obj).subscribe(item => {
                this._response = item;
                console.log('this._response: ', this._response);
                if (this._response.responseCode == HttpStatusCode.Ok) {
                    this.toastr.success('Validate OTP & complete the registration', 'Registration');
                    this.router.navigateByUrl('/confirmotp');
                } else {
                    this.toastr.error(`Faild due to : ${this._response.message}`, 'Registration Faild');
                }
            });
        }
    }
}
