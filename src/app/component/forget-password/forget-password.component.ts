import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

import { MaterialModule } from '@app/material/material.module';
import { ApiResponse } from '@app/models/api-response';
import { UserStoreService } from '@app/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-forgetpassword',
    standalone: true,
    imports: [MaterialModule, FormsModule, RouterLink, AsyncClickDirective],
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
                    this.router.navigateByUrl('/updatepassword');
                } else {
                    this.toastr.error(`Failed Due to:${this._response.message}`, 'Failed');
                }
            })
        );
    }
}
