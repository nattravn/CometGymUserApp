import { Routes } from '@angular/router';

import { ConfirmOtpComponent } from './component/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';
import { AuthLoadGuard } from './guards/menu-access.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthLoadGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirmotp', component: ConfirmOtpComponent },
    { path: 'forgetpassword', component: ForgetPasswordComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'updatepassword', component: UpdatePasswordComponent },
];
