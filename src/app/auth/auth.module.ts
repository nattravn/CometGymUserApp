import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AsyncClickDirective } from 'ngx-async-click';

import { ConfirmOtpComponent } from '@app/auth/components/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from '@app/auth/components/forget-password/forget-password.component';
import { LoginComponent } from '@app/auth/components/login/login.component';
import { RegisterComponent } from '@app/auth/components/register/register.component';
import { ResetPasswordComponent } from '@app/auth/components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from '@app/auth/components/update-password/update-password.component';
import { MaterialModule } from '@app/core/material/material.module';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ConfirmOtpComponent,
        ForgetPasswordComponent,
        ResetPasswordComponent,
        UpdatePasswordComponent,
        AuthComponent,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, AsyncClickDirective, AuthRoutingModule],
})
export class AuthModule {}
