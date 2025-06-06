import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    // { path: '', component: AppComponent },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
    { path: 'confirmotp', component: ConfirmOtpComponent },
    { path: 'forgetpassword', component: ForgetPasswordComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'updatepassword', component: UpdatePasswordComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
