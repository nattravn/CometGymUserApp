import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { MaterialModule } from '@app/material/material.module';
import { ApiResponse } from '@app/models/api-response';
import { RegisterConfirm } from '@app/models/user.model';
import { UserStoreService } from '@app/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-confirm-otp',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterLink],
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
                this.router.navigateByUrl('/login');
            } else {
                this.toastr.error(`Failed Due to:${apiResponse.message}`, 'Registeration Failed');
            }
        });
    }
}
