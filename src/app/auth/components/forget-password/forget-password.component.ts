import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { UserStoreService } from '@app/core/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-forgetpassword',
    standalone: false,
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
    username = '';
    _response!: ApiResponse;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private userStoreService: UserStoreService
    ) {}

    Proceed(): Observable<ApiResponse> {
        return this.userStoreService.Forgetpassword(this.username).pipe(
            tap(item => {
                this._response = item;
                if (this._response.result == 'pass') {
                    this.toastr.success('OTP sent to the registered email.', 'Forget Password');
                    this.userStoreService._username.set(this.username);
                    this.router.navigateByUrl('auth/updatepassword');
                } else {
                    this.toastr.error(`Failed Due to:${this._response.message}`, 'Failed');
                }
            })
        );
    }
}
