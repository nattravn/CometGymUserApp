import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { UpdatePassword } from '@app/core/models/user.model';
import { UserStoreService } from '@app/core/services/user.store.service';

interface UpdateForm {
    password: FormControl<string>;
    otpText: FormControl<string>;
}

export interface UpdateFormModel {
    password: string;
    otpText: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css'],
    standalone: false,
})
export class UpdatePasswordComponent implements OnInit {
    currentusername = '';

    resetForm = new FormGroup<UpdateForm>({
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        otpText: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor(
        private userService: UserStoreService,
        private toastr: ToastrService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.currentusername = this.userService._username();
    }

    proceedChange$(): Observable<ApiResponse> {
        if (!this.resetForm.valid) return of();
        const { password, otpText } = this.resetForm.getRawValue();

        const updatePassword: UpdatePassword = {
            username: this.currentusername,
            password: password,
            otpText: otpText,
        };

        return this.userService.Updatepassword(updatePassword).pipe(
            tap((apiResponse: ApiResponse) => {
                if (apiResponse.result == 'Pass') {
                    this.toastr.success('Please login with new password', 'Password changed');
                    this.router.navigateByUrl('app/login');
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
