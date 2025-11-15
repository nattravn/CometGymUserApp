import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ApiResponse } from '@app/core/models/api-response';
import { RegisterConfirm } from '@app/core/models/user.model';
import { UserStoreService } from '@app/core/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-confirm-otp',
    standalone: false,
    templateUrl: './confirm-otp.component.html',
    styleUrl: './confirm-otp.component.scss',
})
export class ConfirmOtpComponent implements OnInit {
    optFormControl = new FormControl('', [Validators.required]);
    optText = '';
    regResponse!: RegisterConfirm;
    _response: any;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private userService: UserStoreService
    ) {}

    ngOnInit(): void {
        this.regResponse = this.userService.registerResponse();
    }

    confirmOTP(): void {
        this.regResponse.otptext = this.optText;
        this.userService.ConfirmRegistartion(this.regResponse).subscribe((apiResponse: ApiResponse) => {
            if (apiResponse.responseCode == HttpStatusCode.Ok) {
                this.toastr.success('Registeration completed successfully.', 'Success');
                this.userService.registerResponse.set({
                    userid: 0,
                    username: '',
                    otptext: '',
                });
                this.router.navigateByUrl('login');
            } else {
                this.toastr.error(`Failed Due to:${apiResponse.message}`, 'Registeration Failed');
            }
        });
    }
}
