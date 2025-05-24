import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';

import { MaterialModule } from '@app/material/material.module';
import { ApiResponse } from '@app/models/api-response';
import { ResetPasswordFormModel } from '@app/models/user.model';
import { UserStoreService } from '@app/services/user.store.service';

interface RegisterForm {
    //username: FormControl<string>;
    oldPassword: FormControl<string>;
    newPassword: FormControl<string>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    imports: [ReactiveFormsModule, MaterialModule, CommonModule, AsyncClickDirective],
})
export class ResetPasswordComponent {
    resetForm = new FormGroup<RegisterForm>({
        // username: new FormControl('', {
        //     nonNullable: true,
        //     validators: [Validators.required],
        // }),
        oldPassword: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        newPassword: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor(
        private userService: UserStoreService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    proceedReset(): Observable<ApiResponse> {
        console.log('resetPassword: ', this.resetForm.valid);
        if (!this.resetForm.valid) return of();
        const { newPassword, oldPassword } = this.resetForm.getRawValue();

        if (!localStorage.getItem('username')) {
            this.toastr.error(`Login and out to set local storage`);
            return of();
        }

        const resetPassword: ResetPasswordFormModel = {
            userName: localStorage.getItem('username') as string,
            oldPassword,
            newPassword,
        };

        return this.userService.Resetpassword(resetPassword).pipe(
            tap((apiResponse: ApiResponse) => {
                console.log('this._response: ', apiResponse);
                if (apiResponse.responseCode == HttpStatusCode.Ok) {
                    this.toastr.success('Please login with new password', 'Password changed');
                    this.router.navigateByUrl('/login');
                } else {
                    this.toastr.error(
                        `Failed due to : ${apiResponse.message ?? apiResponse.result}`,
                        'Resetpassword Failed'
                    );
                }
            }),
            catchError(error => {
                console.log('error: ', error);
                this.toastr.error(`Failed due to : ${error.error.title}`, 'Resetpassword Failed');
                if (error.status == HttpStatusCode.BadRequest) {
                    console.log('error: ', error.error.errors);
                }
                return of();
            })
        );
    }
}
