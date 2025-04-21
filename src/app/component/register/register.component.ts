import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

// import { UserRegistration } from '@app/models/user.model';

export type RegisterFormControls = {
    [K in keyof RegisterFormModel]: FormControl<RegisterFormModel[K]>;
};

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
    selector: 'app-register',
    imports: [ReactiveFormsModule, MaterialModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    formBuilder2: FormBuilder = new FormBuilder();
    //regForm!: FormGroup<RegisterFormControls>;
    _regForm!: FormGroup<RegisterForm>;

    constructor(private fb: FormBuilder) {}
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
    }

    proceedregister() {
        if (this._regForm.valid) {
            // let _obj: UserRegistration = {
            //   userName: this._regForm.value.username,
            //   name: this._regForm.value.name,
            //   phone: this._regForm.value.phone,
            //   email: this._regForm.value.email,
            //   password: this._regForm.value.password
            // }
        }
    }
}
