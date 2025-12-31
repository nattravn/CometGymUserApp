import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmOtpComponent } from '@app/auth/components/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from '@app/auth/components/forget-password/forget-password.component';
import { RegisterComponent } from '@app/auth/components/register/register.component';
import { ResetPasswordComponent } from '@app/auth/components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from '@app/auth/components/update-password/update-password.component';

import { AuthComponent } from './auth.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent }, // NoAuthGuard to avoid log in every time page user enter base route, but user will always be redirected on back navigation
            //{ path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'confirmotp', component: ConfirmOtpComponent },
            { path: 'forgetpassword', component: ForgetPasswordComponent },
            { path: 'resetpassword', component: ResetPasswordComponent },
            { path: 'updatepassword', component: UpdatePasswordComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
